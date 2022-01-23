use web_sys::{window, Window, Document, HtmlElement};

pub struct HtmlData {
  pub window: Window,
  pub document: Document,
  pub body: HtmlElement,
}

impl HtmlData {
  pub fn new() -> HtmlData {
    let window = window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    HtmlData {
      window: window,
      document: document,
      body: body,
    }
  }
}