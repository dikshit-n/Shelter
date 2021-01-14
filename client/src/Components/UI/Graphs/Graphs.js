import { useEffect, useRef } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import randomColor from "random-color-rgb";
import "./Graphs.css";

export const Bar = ({ config, data: { labels, values }, className, style }) => {
  const chartRef = useRef();

  useEffect(() => {
    const chartContainer = document.querySelectorAll(".my-zing-chart");
    chartContainer?.forEach((el) => {
      if (el) {
        el.addEventListener("contextmenu", () => {
          const rightClickShit = document.getElementById(
            "zingchart-react-3-menu"
          );
          if (rightClickShit) {
            rightClickShit.style.display = "none";
          }
        });
      }
    });
    const licenseShits = [
      ".zingchart-react-0-license-text",
      "#zingchart-react-0-license-text",
      `[title="JavaScript Charts by ZingChart"]`,
    ];

    licenseShits.forEach((el) => {
      let getOut = document.querySelectorAll(el);
      if (getOut) {
        getOut.forEach((ele) => {
          if (ele) {
            ele.style.display = "none";
          }
        });
      }
    });

    // chartContainer?.forEach((el) => {
    // el.addEventListener("contextmenu", function (p) {
    //   return false;
    // });
    // });
    // chartContainer?.forEach((el) => {
    //   el.addEventListener("contextmenu", () => {
    //     return false;
    // const menuContainer = document.getElementById("zingchart-react-1-menu");
    // const topBorder = document.getElementById(
    //   "zingchart-react-1-menu-sep-export"
    // );
    // if (menuContainer) {
    //   menuContainer.style.cursor = "pointer";
    // }
    // if (topBorder) {
    //   topBorder.style.display = "none";
    // }
    // let unwantedComponents = [
    //   "zingchart-react-1-menu-item-viewdatatable",
    //   "zingchart-react-1-menu-item-viewaspng",
    //   "zingchart-react-0-menu-item-xmiabt",
    //   "zingchart-react-0-license-text",
    // ];
    // unwantedComponents.forEach((ele) => {
    //   let unwantedItem = document.getElementById(ele);
    //   //   console.log(unwantedItem);
    //   if (unwantedItem) {
    //     unwantedItem.style.display = "none";
    //   }
    // });
    //   });
    // });
  }, []);

  //   let

  return (
    <div className={"my-zing-chart " + className} style={style}>
      <ZingChart
        ref={chartRef}
        data={{
          type: "bar3d",
          "3d-aspect": {
            true3d: false,
            depth: "10px",
          },
          "scale-x": {
            zooming: true,
            "zoom-to": [0, 5],
            transform: {
              type: "date",
              all: "%d %M %Y<br> %h:%i:%s",
            },
            values: [...labels],
          },
          "scroll-x": {
            handle: {
              "background-color": "#E80C7A",
            },
          },
          series: [
            // ...values.map((el) => ({ values: [el] })),
            {
              values: [...values],
            },
          ],
          gui: {
            behaviors: [
              {
                id: "Reload",
                enabled: "none",
              },
              {
                id: "ViewSource",
                enabled: "none",
              },
              {
                id: "Data",
                enabled: "none",
              },
            ],
          },
          plot: {
            "bar-width": 30,
            styles: [
              ...values.map((el) => {
                let color = randomColor();
                return color + color;
              }),
            ],
            animation: {
              effect: "ANIMATION_SLIDE_BOTTOM",
              sequence: 0,
              speed: 800,
              delay: 800,
            },
          },
          ...config,
        }}
      />
    </div>
  );
};
