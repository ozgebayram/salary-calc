import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Col,
  
} from "react-bootstrap";

function Pages() {
  const [yearsOfWork, setYearsOfWork] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [educationLevel, setEducationLevel] = useState("highschool");
  const [department, setDepartment] = useState("default");
  const [finalSalary, setFinalSalary] = useState(0);
  const [calculatedData, setCalculatedData] = useState(null);

  const baseSalary = 11402;
  const percent = 0.15;

  const departmentInfo = {
    default: { zamRatio: 0, baseSalary: 11402 },
    buroMemur: { zamRatio: 0.1, baseSalary: 11402 },
    danısma: { zamRatio: 0.08, baseSalary: 11402 },
    muhasebe: { zamRatio: 0.12, baseSalary: 11402 },
    ogretmen: { zamRatio: 0.15, baseSalary: 24000 },
  };

  const calculateFinalSalary = () => {
    // Seçilen departmana göre bilgileri al
    const { zamRatio, baseSalary: departmentBaseSalary } =
      departmentInfo[department] || departmentInfo.default;

    // Departman bazında zam eklemesi
    if (department === "ogretmen") {
      // Öğretmen departmanı için özel maaş ve yüzde 15 zam
      let addedSalary = departmentBaseSalary + departmentBaseSalary * 0.15;

      // Öğretmen departmanı için çalışma yılına göre zam
      if (yearsOfWork >= 5) {
        addedSalary += addedSalary * 0.05;
      }
      if (yearsOfWork >= 10) {
        addedSalary += addedSalary * 0.1;
      }

      // Üniversite mezunu ise %3 zam
      if (educationLevel === "university") {
        addedSalary += addedSalary * 0.03;
      }

      // cocuk sayısına göre %2 zam
      const childCountSalary = addedSalary * 0.02 * childCount;
      addedSalary += childCountSalary;

      setFinalSalary(addedSalary);

      // Düzeltme: setCalculatedData'ya addedSalary eklenmeli, finalSalary yerine
      setCalculatedData({
        yearsOfWork,
        childCount,
        educationLevel,
        department,
        finalSalary: addedSalary,
        childCountSalary,
      });
      return; // Exit early for "Öğretmen" department
    }

    // For other departments, continue with the general calculations
    let addedSalary = baseSalary + baseSalary * percent;

    // General calculations for years of work, education level, etc.
    if (yearsOfWork >= 5) {
      addedSalary += addedSalary * 0.05;
    }
    if (yearsOfWork >= 10) {
      addedSalary += addedSalary * 0.1;
    }
    if (educationLevel === "university") {
      addedSalary += addedSalary * 0.03;
    }
    addedSalary += addedSalary * zamRatio;

    // cocuk sayısına göre %2 zam
    const childCountSalary = addedSalary * 0.02 * childCount;
    addedSalary += childCountSalary;

    setFinalSalary(addedSalary);

    // Düzeltme: setCalculatedData'ya addedSalary eklenmeli, finalSalary yerine
    setCalculatedData({
      yearsOfWork,
      childCount,
      educationLevel,
      department,
      finalSalary: addedSalary,
      childCountSalary,
    });
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col md={6}>
        <h2 className="text-center mt-2">Maaş Hesaplama</h2>
          <Form className="border p-2 ">
            <Form.Group controlId="formDepartment" className="mb-3">
              <Form.Label className="fw-bold">Departman</Form.Label>
              <Form.Control
                as="select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="default">Seçilmedi</option>
                <option value="muhasebe">Muhasebe</option>
                <option value="buroMemur">Büro Memuru</option>
                <option value="danısma">Danışma</option>
                <option value="ogretmen">Öğretmen</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formYearsOfWork" className="mb-3">
              <Form.Label className="fw-bold">Çalışma Yılı</Form.Label>
              <Form.Control
                type="number"
                value={yearsOfWork}
                onChange={(e) => setYearsOfWork(parseInt(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="formEducationLevel" className="mb-3">
              <Form.Label className="fw-bold">Eğitim Durumu</Form.Label>
              <Form.Control
                as="select"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="Lise">Lise</option>
                <option value="Üniversite">Üniversite</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formChildCount">
              <Form.Label className="fw-bold">Çocuk Sayısı</Form.Label>
              <Form.Control
                as="select"
                value={childCount}
                onChange={(e) => setChildCount(e.target.value)}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              onClick={calculateFinalSalary}
              className="mt-3"
            >
              Hesapla
            </Button>
          </Form>
        </Col>
      </Row>

      {calculatedData && (
        <div className="mt-3">
          {/* <h4>
            Toplam Maaş: ₺{" "}
            {calculatedData.finalSalary
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h4> */}

          {/* Display the calculated data in a table */}
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Çalışma Yılı</th>
                <th>Çocuk Sayısı</th>
                <th>Eğitim Durumu</th>
                <th>Departman</th>
                <th>Toplam Maaş</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{calculatedData.yearsOfWork}</td>
                <td>{calculatedData.childCount}</td>
                <td>{calculatedData.educationLevel}</td>
                <td>{calculatedData.department}</td>
                <td>
                  {finalSalary.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default Pages;
