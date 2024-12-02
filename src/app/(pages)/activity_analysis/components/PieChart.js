"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart({ categories, events }){
    const chartRef = useRef(null)

    useEffect(() => {
        const labels = [];
        const data = [];
        let index = 0;

        // Iterate through events
        categories.map((category) => {
            labels.push(category.name)

            let tempfilteredEvents = events.filter((event) =>
                event.categories.includes(category.id)
            );

            tempfilteredEvents.forEach((event) => {
                const startTime = new Date(event.start);
                const endTime = new Date(event.end);
    
                // Calculate duration in hours
                const duration = (endTime - startTime);
                const durationHours = (endTime - startTime) / (1000 * 60 * 60);
    
                // Add duration to each category the event belongs to
                data[index] = 0 + duration;
            });
            index += 1;
        });
        

        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "pie",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Time Spent",
                            data: data,
                            backgroundColor: [
                                "rgb(255, 99, 132, 0.2)",
                                "rgb(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                            ],
                            borderWidth: 1,
                        },
                        
                    ],
                    
                },
                options: {
                    plugins: {
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const ms = context.raw; // The raw data in milliseconds
                              const hours = Math.floor(ms / (1000 * 60 * 60));
                              const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
                              return `${context.label}: ${hours}h ${minutes}m`; // Format the tooltip
                            },
                          },
                        },
                    }
                }
            });

            

            chartRef.current.chart = newChart
        }
    }, [])
    return <canvas style={{width: "100%", objectFit: "fill"}} ref={chartRef}/>
}