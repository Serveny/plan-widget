use wasm_bindgen::JsCast;
use web_sys::{ HtmlElement };

use crate::HtmlData;
use crate::HtmlGrid;

pub struct RustyPlanner {
    pub html_data: HtmlData,
    pub resource_grid: HtmlGrid,
    pub entity_grid: HtmlGrid,
}

impl RustyPlanner {
    pub fn new(container_el_id: &str) -> RustyPlanner {
        let html_data = HtmlData::new();
        let container_el = html_data
            .document
            .get_element_by_id(container_el_id)
            .expect("can't find container element")
            .dyn_into::<HtmlElement>()
            .expect("#rustyPlannerContainer should be an `HtmlElement`");
        let resource_grid = HtmlGrid::new(&html_data, &container_el);
        let entity_grid = HtmlGrid::new(&html_data, &container_el);
        RustyPlanner {
            html_data,
            resource_grid,
            entity_grid,
        }
    }
}
