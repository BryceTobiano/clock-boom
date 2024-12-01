"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function DonutChart(){
    const chartRef = useRef(null)

    useEffect(() => {
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "doughnut",
                data: {
                    labels: ["Work", "Personal", "Self-Development"],
                    datasets: [
                        {
                            label: "Work Logged in Last 4 Days",
                            data: [34, 63, 43],
                            backgroundColor: [
                                "rgb(83, 150, 228, 0.3)",
                                "rgb(253, 198, 19, 0.3)",
                                "rgb(69, 182, 129, 0.3)",
                                "rgb(75, 192, 192, 0.2)",
                                "rgb(54, 162, 235, 0.2)",
                                "rgb(153, 102, 255, 0.2)",
                                "rgb(201, 203, 207, 0.2)",
                            ],
                            borderColor: [
                                "rgb(83, 150, 228)",
                                "rgb(253, 198, 19)",
                                "rgb(69, 182, 129)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(153, 102, 255)",
                                "rgb(201, 203, 207)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    // responsive: true; 
                }
            });

            chartRef.current.chart = newChart
        }
    }, [])
    return<div style={{ position:"relative", width:"400px", height:"100%"}}>
        <canvas ref={chartRef}/>
    </div>

}