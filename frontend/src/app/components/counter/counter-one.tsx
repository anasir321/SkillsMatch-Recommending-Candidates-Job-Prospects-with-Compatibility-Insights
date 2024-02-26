import React from "react";
import CounterUp from "../common/counter-up";

// counter data
const counter_data: {
  id: number;
  number: number;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 1,
    number: 7,
    title: "million",
    subtitle: "Completed Jobs",
  },
  {
    id: 2,
    number: 30,
    title: "k+",
    subtitle: "Worldwide Client",
  },
  {
    id: 3,
    number: 13,
    title: "billion",
    subtitle: "Dollar Payout",
  },
];

const CounterOne = ({
  style_2 = false,
  style_3 = false,
}: {
  style_2?: boolean;
  style_3?: boolean;
}) => {
  return (
    <>
      {counter_data.map((c) => (
        <div key={c.id} className="col-sm-4">
          <div
            className={`${
              style_2 ? "counter-block-two mt-15" : "counter-block-one mt-25"
            } text-center wow fadeInUp`}
          >
            {!style_3 && (
              <div className={`main-count fw-500 ${style_2 ? "text-white" : "text-dark"}`}>
                <span className="counter">
                  <CounterUp
                    number={c.number}
                    text={c.title}
                    add_style={true}
                  />
                </span>
              </div>
            )}
            {style_3 && (
              <h2 className={`main-count fw-500`}>
                <span className="counter">
                  <CounterUp
                    number={c.number}
                    text={c.title}
                    add_style={true}
                  />
                </span>
              </h2>
            )}
            <p className={`${style_2 ? "text-white" : ""}`}>{c.subtitle}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CounterOne;
