"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function filterEventsByDay(events, day) {
    // Get the start and end of the given day
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0); // Midnight
  
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999); // End of the day
  
    // Filter events that occur on this day
    return events.filter((event) => {
      const eventStart = new Date(event.start).getTime();
      const eventEnd = new Date(event.end).getTime();
  
      return (
        (eventStart >= startOfDay.getTime() && eventStart <= endOfDay.getTime()) ||
        (eventEnd >= startOfDay.getTime() && eventEnd <= endOfDay.getTime())
      );
    });
  }

  function getCurrentWeekDays() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day (0-6, Sunday-Saturday)
  
    // Calculate the start of the current week (Sunday)
    const daysToSunday = -dayOfWeek; // Sunday is day 0, so subtract dayOfWeek from today
    const thisSunday = new Date(today);
    thisSunday.setDate(today.getDate() + daysToSunday); // Adjust to the current Sunday
  
    // Create an array of dates for each day of the current week (Sunday to Saturday)
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(thisSunday);
      day.setDate(thisSunday.getDate() + i); // Add i days to get each day of the week
      weekDays.push(day);
    }
  
    return weekDays;
  }

export default function BarChart({ categories, events }){
    const chartRef = useRef(null)

    useEffect(() => {
        const data = [];
        const labels = [];

        const weekDays = getCurrentWeekDays();

        categories.map((category) => {
            labels.push(category.name)
            data.push([0,0,0,0,0,0,0]);
        })

        weekDays.forEach((day) => {
            let globalDataIndex = 0;

            const filteredByDay = filterEventsByDay(events, day);

            categories.map((category) => {
                let filteredByDayCategory = filteredByDay.filter((event) => event.categories.includes(category.id));

                filteredByDayCategory.forEach((event) => {
                    const startTime = new Date(event.start);
                    const endTime = new Date(event.end);
        
                    // Calculate duration in hours
                    const duration = (endTime - startTime) / 60000;
        
                    // Add duration to each category the event belongs to
                    data[globalDataIndex][startTime.getDay()] = duration;
                });
                globalDataIndex += 1;
            })

        });

        const datasets = data.map((categoryData, index) => {
            return {
                label: labels[index]?.name || `Category ${index + 1}`, // Dynamically name the category
                data: categoryData, // Assign the data array
                borderWidth: 1,
            };
        });        
        
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "bar",
                responsive:true,
                maintainAspectRatio: false,
                data: {
                    labels: ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"],
                    datasets: datasets,
                },
                options: {
                    // responsive: true;
                    scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    // Convert minutes to hours
                                    const hours = Math.floor(value / 60);
                                    const minutes = value % 60;
                                    if (minutes === 0) {
                                        return `${hours}h`; // Show as "Xh" if no minutes
                                    }
                                    return `${hours}h ${minutes}m`; // Show as "Xh Ym"
                                },
                            },
                        }
                      }
                }
            });

            chartRef.current.chart = newChart
        }
    }, [])
    
    return ( <canvas style={{width: "100%", objectFit: "contain"}} ref={chartRef}/> )

}