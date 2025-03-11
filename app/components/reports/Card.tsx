"use client";

import React, { useState, useMemo } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import JSZip from "jszip";
import { getPolicyStatus } from "@/actions/policy/actions";
import { getAllTransactionsCount } from "@/actions/transaction/actions";
import { useCustomerStore } from "@/store/customer";
import { useShallow } from "zustand/shallow";

const Card = (data: any) => {
  const dataExtract = useMemo(() => {
    return Array.isArray(data?.data) ? data.data : [];
  }, [data?.data]);
  const headers = dataExtract.length > 0 ? Object.keys(dataExtract[0]) : [];

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filterText, setFilterText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const sortedData = useMemo(() => {
    const sortableData = [...dataExtract];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [dataExtract, sortConfig]);

  const filteredData = sortedData.filter(item =>
    headers.some(header =>
      item[header].toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const requestSort = (key: any) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const downloadExcel = () => {
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row: any) =>
        headers.map(header => row[header]).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "pulse_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage =>
      Math.min(prevPage + 1, Math.ceil(filteredData.length / rowsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-2">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          className="p-2 border rounded w-full mr-4"
        />
        <button
          onClick={downloadExcel}
          className="flex items-center p-2 rounded"
        >
          <Download className="w-6 h-6 mr-2" />
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <b>{data.title}</b>
        <span className="text-gray-600"> Total: {filteredData.length}</span>
      </div>
      <div className="max-h-80 overflow-auto">
        <table className="table-auto w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {headers.map(header => (
                <th
                  key={header}
                  onClick={() => requestSort(header)}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  {header}
                  {sortConfig.key === header
                    ? sortConfig.direction === "ascending"
                      ? " 🔼"
                      : " 🔽"
                    : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item, index) => (
              <tr key={index}>
                {headers.map(header => (
                  <td key={header} className="px-4 py-2 whitespace-nowrap">
                    {item[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 rounded"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(filteredData.length / rowsPerPage)
          }
          className="p-2 rounded"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const downloadAsZip = (data: any) => {
  const zip = new JSZip();

  Object.keys(data).forEach(key => {
    const dataExtract = Array.isArray(data[key]) ? data[key] : [];
    const headers = dataExtract.length > 0 ? Object.keys(dataExtract[0]) : [];
    const csvContent =
      headers.join(",") +
      "\n" +
      dataExtract
        .map((row: any) => headers.map(header => row[header]).join(","))
        .join("\n");
    zip.file(`${key}.csv`, csvContent);
  });

  zip.generateAsync({ type: "blob" }).then((content: any) => {
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data_pulse_extract.zip");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

const downloadReports = async () => {
  const ph = await getAllTransactionsCount();
  const transaction = ph?.transactions;
  const [allCustomerStoreData, getCustomerType] = useCustomerStore(
    useShallow(state => [
      {
        personalData: state.personalData,
        corporateData: state.corporateData,
        customerTypeCount: state.customerTypeCount
      },
      state.getCustomerType
    ])
  );

  const [policyStatus, _, transactions] = await Promise.all([
    getPolicyStatus(),
    getCustomerType(),
    transaction
  ]);

  const data = {
    PolicyStatusCount: policyStatus.policyStatusCountType,
    CustomerType: allCustomerStoreData,
    Transaction: transactions
  };

  downloadAsZip(data);
};

function DownloadButton() {
  return (
    <button
      onClick={downloadReports}
      className="flex items-center text-white bg-blue-500 hover:bg-blue-600 p-2 rounded"
    >
      <Download className="w-6 h-6 mr-2" /> Export All
    </button>
  );
}

export { DownloadButton, Card, downloadAsZip };
