// version where i try to make text size change to fit contianer
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {
  const [fontSize, setFontSize] = useState(16);
  const contentRefs = useRef([]);

  const adjustFontSize = () => {
    contentRefs.current.forEach((contentRef, idx) => {
      if (!contentRef) return;
      let size = fontSize;
      while (
        contentRef.scrollHeight > contentRef.clientHeight &&
        size > 1
      ) {
        size -= 0.5;
        contentRef.style.fontSize = `${size}px`;
      }
    });
  };

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [dataportfolio]);

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Testimonials | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Testimonials </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img
                  src={data.img}
                  alt={`Photograph of a person who reviewed Alina's services - ${data.description}`}
                />
                <div
                  className="content"
                  ref={(el) => (contentRefs.current[i] = el)}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  <p>{data.description}</p>
                  <a href={data.link}>view project</a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};


// working 
// import React from "react";
// import "./style.css";
// import { Helmet, HelmetProvider } from "react-helmet-async";
// import { Container, Row, Col } from "react-bootstrap";
// import { dataportfolio, meta } from "../../content_option";

// export const Portfolio = () => {
//   return (
//     <HelmetProvider>
//       <Container className="About-header">
//         <Helmet>
//           <meta charSet="utf-8" />
//           <title> Testimonials | {meta.title} </title>{" "}
//           <meta name="description" content={meta.description} />
//         </Helmet>
//         <Row className="mb-5 mt-3 pt-md-3">
//           <Col lg="8">
//             <h1 className="display-4 mb-4"> Testimonials </h1>{" "}
//             <hr className="t_border my-4 ml-0 text-left" />
//           </Col>
//         </Row>
//         <div className="mb-5 po_items_ho">
//           {dataportfolio.map((data, i) => {
//             return (
//               <div key={i} className="po_item">
//                 <img src={data.img} alt="" />
//                 <div className="content">
//                   <p>{data.description}</p>
//                   <a href={data.link}>view project</a>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Container>
//     </HelmetProvider>
//   );
// };
