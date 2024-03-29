import { useEffect } from "react";

const HoroscopeMatch = () => {
  useEffect(() => {
    var api = "match_horoscope";
    var userId = "629354";
    var apiKey = "64481946d894352d6af90763fcf829e5fb65b33b";
    var data = {
      m_day: 6,
      m_month: 1,
      m_year: 2000,
      m_hour: 7,
      m_min: 45,
      m_lat: 19.132,
      m_lon: 72.342,
      m_tzone: 5.5,
      f_day: 6,
      f_month: 1,
      f_year: 2000,
      f_hour: 7,
      f_min: 45,
      f_lat: 19.132,
      f_lon: 72.342,
      f_tzone: 5.5,
    };

    var auth = "Basic " + btoa(userId + ":" + apiKey);

    fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);
  return <div>HoroscopeMatch</div>;
};

export default HoroscopeMatch;
