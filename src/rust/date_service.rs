use chrono::{DateTime, NaiveDateTime, Utc};
use serde::{Deserialize, Deserializer};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Interval {
    start: DateTime<Utc>,
    end: DateTime<Utc>,
}

impl Interval {
    pub fn new(start_timestamp_sec: i64, end_timestamp_sec: i64) -> Interval {
        Interval {
            start: DateService::timestamp_sec_to_date(start_timestamp_sec),
            end: DateService::timestamp_sec_to_date(end_timestamp_sec),
        }
    }
}

impl<'de> Deserialize<'de> for Interval {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let data = <[i64; 2]>::deserialize(deserializer)?;
        Ok(Interval::new(data[0], data[1]))
    }
}

pub struct DateService {}

impl DateService {
    pub fn timestamp_sec_to_date(timestamp_sec: i64) -> DateTime<Utc> {
        DateTime::from_utc(NaiveDateTime::from_timestamp(timestamp_sec, 0), Utc)
    }

    pub fn each_year_of_interval(interval: Interval) -> Vec<DateTime<Utc>> {
        let mut dates: Vec<DateTime<Utc>> = Vec::new();
        dates.push(interval.start);
        dates.push(interval.end);
        dates.push(interval.end);
        return dates;
    }
}
