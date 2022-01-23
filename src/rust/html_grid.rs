use web_sys::{HtmlElement, HtmlTableElement, HtmlTableSectionElement};
use wasm_bindgen::JsCast;
use crate::HtmlData;

pub struct HtmlGrid {
  pub table_el: HtmlTableElement,
  pub table_head_el: HtmlTableSectionElement,
  pub table_body_el: HtmlTableSectionElement,
}

impl HtmlGrid {
  pub fn new(html_data: &HtmlData, container_el: &HtmlElement) -> HtmlGrid {
    // <table> element
    let table_el = html_data.document
      .create_element("table")
      .expect("can't create table element")
      .dyn_into::<HtmlTableElement>()
      .unwrap();

    // <thead> element
    let table_head_el = html_data.document.create_element("thead")
      .expect("can't create thead element")
      .dyn_into::<HtmlTableSectionElement>()
      .unwrap();

    // <tbody> element
    let table_body_el = html_data.document.create_element("tbody")
      .expect("can't create tbody element")
      .dyn_into::<HtmlTableSectionElement>()
      .unwrap();

    table_el.append_child(&table_head_el).unwrap();
    table_el.append_child(&table_body_el).unwrap();

    container_el
      .append_child(&table_el)
      .expect("can't append table to container");
    
    HtmlGrid {
      table_el,
      table_head_el,
      table_body_el,
    }
  }
}

// impl Drop for HtmlGrid {
//   fn drop(&mut self) {
//     self.table_el.remove();
//   }
// }