import React, { useState } from "react";
import TransportDistanceDistribution from "./PieChartDistance";
import TransportHourDistribution from "./PieChartHour";
import FileUploadDemo from "../../ui/FileUploadBox";
import { Bus, Train, Car, Upload } from "lucide-react";

const Transport1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = () => {
    setSelectedFile(true);
    console.log(selectedFile);
  };
  const [fileUploaded, setFileUploaded] = useState(false);
  const [mostVisitedPlaces] = useState([
    {
      place: "Central Business District",
      frequency: "Daily",
      distance: "5.2 km",
      popularModes: ["Bus", "Train"],
    },
    {
      place: "Shopping Mall",
      frequency: "Weekly",
      distance: "3.8 km",
      popularModes: ["Bus", "EV Cab"],
    },
    {
      place: "Tech Park",
      frequency: "Daily",
      distance: "7.1 km",
      popularModes: ["Train", "Bus"],
    },
  ]);

  const [travelOptions] = useState({
    bus: [
      {
        route: "102",
        stops: "Central Station - Tech Park",
        frequency: "10 mins",
      },
      {
        route: "205",
        stops: "Mall Circle - Business District",
        frequency: "15 mins",
      },
    ],
    train: [
      {
        station: "Central",
        lines: ["Red", "Blue"],
        firstTrain: "5:00 AM",
        lastTrain: "11:30 PM",
      },
      {
        station: "Tech Hub",
        lines: ["Blue"],
        firstTrain: "5:15 AM",
        lastTrain: "11:00 PM",
      },
    ],
    evCabs: [
      { service: "GreenCab", avgWaitTime: "5 mins", baseRate: "$5" },
      { service: "EcoRide", avgWaitTime: "8 mins", baseRate: "$4.50" },
    ],
  });

  return (
    <>
      <div className="ml-14">
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-center text-white py-20">
            <div className="container mx-auto px-6">
              <h1 className="text-6xl font-extrabold mb-4">
                Transport Analytics Dashboard
              </h1>
              <p className="text-white text-lg max-w-2xl mx-auto">
                Monitor and analyze your transportation patterns with our
                comprehensive dashboard. Upload your data to get detailed
                insights about your travel habits.
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="container mx-auto px-6 -mt-16">
            <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg flex items-center flex-col border border-teal-300">
              <Upload className="h-14 w-14 text-teal-700 mb-4" />
              <h2 className="text-3xl font-semibold text-teal-900 mb-2 text-center">
                Upload Your Travel Data
              </h2>
              <p className="text-teal-600 mb-6 text-center">
                Drag and drop your file or click to browse
              </p>
              <FileUploadDemo />
            </div>
          </div>

          <div className="w-full">
            <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center">
              {/* <Upload className="mx-auto h-12 w-12 text-teal-500 mb-4" /> */}
              {/* <input
                type="file"
                className="w-full mb-4"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
              /> */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSubmit}
                  className="rounded-full px-8 py-2 bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {selectedFile && (
            <>
              {/* Charts Section */}
              <div className="container mx-auto px-6 py-12 mt-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-lg">
                <div className="flex space-x-6">
                  <div className="w-1/2 bg-white rounded-lg shadow-lg p-8 border border-teal-200">
                    <h3 className="text-xl font-semibold text-teal-800 mb-4">
                      Distance Distribution
                    </h3>
                    <TransportDistanceDistribution />
                  </div>
                  <div className="w-1/2 bg-white rounded-lg shadow-lg p-8 border border-teal-200">
                    <h3 className="text-xl font-semibold text-teal-800 mb-4">
                      Hour Distribution
                    </h3>
                    <TransportHourDistribution />
                  </div>
                </div>
              </div>

              {/* Most Visited Places Section */}
              <div className="container mx-auto px-6 mb-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300">
                  <div className="p-6 border-b border-teal-300">
                    <h2 className="text-2xl font-semibold text-teal-900">
                      Most Visited Places
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-teal-300">
                        <thead className="bg-teal-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                              Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                              Visit Frequency
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                              Distance
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                              Popular Transport Modes
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-teal-300">
                          {mostVisitedPlaces.map((place, index) => (
                            <tr
                              key={index}
                              className="hover:bg-teal-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-teal-800">
                                {place.place}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-teal-800">
                                {place.frequency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-teal-800">
                                {place.distance}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-teal-800">
                                {place.popularModes.join(", ")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="bg-gradient-to-br from-teal-700 to-teal-800 py-12">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Bus Options */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300">
                      <div className="p-6 border-b border-teal-300">
                        <h2 className="text-xl font-semibold text-teal-800 flex items-center gap-2">
                          <Bus className="h-5 w-5 text-teal-600" />
                          Bus Routes
                        </h2>
                      </div>
                      <div className="p-6">
                        <table className="min-w-full divide-y divide-teal-300">
                          <thead className="bg-teal-100">
                            <tr>
                              {["Route", "Stops", "Frequency"].map((header) => (
                                <th
                                  key={header}
                                  className="px-4 py-2 text-left text-xs font-medium text-teal-600 uppercase"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-teal-300">
                            {travelOptions.bus.map((route, index) => (
                              <tr
                                key={index}
                                className="hover:bg-teal-50 transition-colors"
                              >
                                <td className="px-4 py-2 text-teal-800">
                                  {route.route}
                                </td>
                                <td className="px-4 py-2 text-teal-800">
                                  {route.stops}
                                </td>
                                <td className="px-4 py-2 text-teal-800">
                                  {route.frequency}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Train Options */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300">
                      <div className="p-6 border-b border-teal-300">
                        <h2 className="text-xl font-semibold text-teal-800 flex items-center gap-2">
                          <Train className="h-5 w-5 text-teal-600" />
                          Train Stations
                        </h2>
                      </div>
                      <div className="p-6">
                        <table className="min-w-full divide-y divide-teal-300">
                          <thead className="bg-teal-100">
                            <tr>
                              {[
                                "Station",
                                "Lines",
                                "First Train",
                                "Last Train",
                              ].map((header) => (
                                <th
                                  key={header}
                                  className="px-4 py-2 text-left text-xs font-medium text-teal-600 uppercase"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-teal-300">
                            {travelOptions.train.map((station, index) => (
                              <tr
                                key={index}
                                className="hover:bg-teal-50 transition-colors"
                              >
                                <td className="px-4 py-2 text-teal-800">
                                  {station.station}
                                </td>
                                <td className="px-4 py-2 text-teal-800">
                                  {station.lines.join(", ")}
                                </td>
                                <td className="px-4 py-2 text-teal-800">
                                  {station.firstTrain}
                                </td>
                                <td className="px-4 py-2 text-teal-800">
                                  {station.lastTrain}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* EV Cab Options */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300">
                      <div className="p-6 border-b border-teal-300">
                        <h2 className="text-xl font-semibold text-teal-800 flex items-center gap-2">
                          <Car className="h-5 w-5 text-teal-600" />
                          EV Cabs
                        </h2>
                      </div>
                      <div className="p-6">
                        <table className="min-w-full divide-y divide-teal-300">
                          <thead className="bg-teal-100">
                            <tr>
                              {["Service", "Avg Wait Time", "Base Rate"].map(
                                (header) => (
                                  <th
                                    key={header}
                                    className="px-4 py-2 text-left text-xs font-medium text-teal-600 uppercase"
                                  >
                                    {header}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-teal-300">
                            {travelOptions.evCabs.map((cab, index) => (
                              <tr
                                key={index}
                                className="hover:bg-teal-50 transition-colors"
                              >
                                <td className="px-4 py-2 text-teal-800">
                                  {cab.service}
                                </td>
                                <td className="px-4 py-2 text-teal-800">
                                  {cab.avgWaitTime}
                                </td>
                                <td className="px-4 py-2 text-teal-800">
                                  {cab.baseRate}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Transport1;
