// const bookingTourController = require("../../../components/bookingtour/BookingTourController");

// let listPrice = [];
// const getData = async () => {
// 	const month = new Date().getMonth() + 1;
// 	const year = new Date().getFullYear();
// 	let day = 31;
// 	switch (month) {
// 		case 1:
// 		case 3:
// 		case 5:
// 		case 7:
// 		case 8:
// 		case 10:
// 		case 12:
// 			day = 31;
// 			break;
// 		case 2:
// 			if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
// 				day = 29;
// 			}
// 			else {
// 				day = 28;
// 			}
// 			break;
// 		case 4:
// 		case 6:
// 		case 9:
// 		case 11:
// 			day = 30;
// 			break;
// 		default:
// 			day = 31;
// 			break;
// 	}

// 	for (let index = 1; index <= day; index++) {
// 		const bookings = await bookingTourController.getAllBookingToursByDay(index, month, year);
// 		let totalPrice = 0;
// 		const total = bookings.forEach(element => {
// 			totalPrice += element.price
// 		});
// 		listPrice.push(totalPrice);
// 	}
// }


(function () {
	/* "use strict" */

	var dzChartlist = function () {
		var reservationChart = function () {
			var options = {
				series: [{
					name: '',
						 data: [400, 400, 650, 500, 1000, 750, 850, 100
						,400, 400, 650, 500, 1000, 750, 850, 100,
						400, 400, 650, 500, 1000, 750, 850, 100
					,400, 400, 650, 500, 1000, 750]
					// data: [listPrice]
				},],
				chart: {
					height: 300,
					type: 'area',
					toolbar: {
						show: false
					}
				},
				colors: ["var(--primary)", "#ff9d43"],
				dataLabels: {
					enabled: false
				},
				stroke: {
					width: 6,
					curve: 'smooth',
				},
				legend: {
					show: false
				},
				grid: {
					borderColor: '#EBEBEB',
					strokeDashArray: 6,
				},
				markers: {
					strokeWidth: 6,
					hover: {
						size: 15,
					}
				},
				yaxis: {
					labels: {
						offsetX: -12,
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400

						}
					},
				},
				xaxis: {
					//  categories: ["SUN","MON","TUE","WED","THU","FRI","SAT"],
					categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
					labels: {
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400

						},
					}
				},
				fill: {
					colors: ["var(--rgba-primary-1)", "#ff9d43"],
					type: "solid",
					opacity: 0.1
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					},
				},
			};

			var chart = new ApexCharts(document.querySelector("#reservationChart"), options);
			chart.render();

		}
		var pieChart1 = function () {
			var options = {
				series: [8, 2],
				chart: {
					type: 'donut',
					height: 250,
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					width: 0,
				},
				colors: ['#717579', 'var(--primary)'],
				legend: {
					position: 'bottom',
					show: false
				},
				responsive: [{
					breakpoint: 1601,
					options: {
						chart: {
							height: 200,
						},
					}
				},
				{
					breakpoint: 1024,
					options: {
						chart: {
							height: 200,
						},
					}
				}]
			};

			var chart = new ApexCharts(document.querySelector("#pieChart1"), options);
			chart.render();

		}
		/* Function ============ */
		return {
			init: function () {
			},


			load: function () {
				pieChart1();
				reservationChart();
			},

			resize: function () {
			}
		}

	}();



	jQuery(window).on('load', function () {
		setTimeout(function () {
			dzChartlist.load();
		}, 2000);

	});


})();