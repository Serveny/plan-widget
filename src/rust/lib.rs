use date_service::*;
use wasm_bindgen::{prelude::*};
use serde_wasm_bindgen::*;

mod date_service;

// use html_grid::*;
// use html_data::*;
// use rusty_planner::*;

// mod html_data;
// mod html_grid;
// mod rusty_planner;

#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    Ok(())
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn test() -> JsValue {
    JsValue::from_str("test blub")
} 

#[wasm_bindgen]
pub fn each_year_of_interval(interval_js: JsValue) -> JsValue {
    let interval: Interval = from_value(interval_js).unwrap();
    let dates = DateService::each_year_of_interval(interval)
        .iter().map(|&date| date.timestamp()).collect::<Vec<i64>>();
    serde_wasm_bindgen::to_value(&dates).unwrap()
}
