let studentList = [];
//Function 1: lấy danh sách sinh viên từ backend
const fetchStudent = () => {
  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
    method: "GET",
  })
    .then((res) => {
      studentList = res.data;
      renderStudent();
      console.log("ahhii");
    })
    .catch((err) => {
      console.log(err);
    });
};

//function 2: hiển thị danh sách sinh viên ra màn hình
const renderStudent = () => {
  //giao diện của 1 sinh viên
  //duyệt mảng sanh sách sinh viên => <tr>
  let htmlContent = "";
  for (let student of studentList) {
    htmlContent += `
        <tr>
            <td>${student.MaSV}</td>
            <td>${student.HoTen}</td>
            <td>${student.Email}</td>
            <td>${student.SoDT}</td>
            <td>${student.CMND}</td>
            <td>${student.DiemToan}</td>
            <td>${student.DiemLy}</td>
            <td>${student.DiemHoa}</td>
            <td>
                <button class="btn btn-danger" onClick="deleteStudent('${student.MaSV}')">Xóa</button>
                <button class="btn btn-info" onClick="getStudent('${student.MaSV}')">Cập nhật</button>
            <td>
        </tr>
    `;
  }

  console.log(htmlContent);
  document.getElementById("tableDanhSach").innerHTML = htmlContent;
};

//function 3: thêm sinh viên

const addStudent = () => {
  const studentID = document.getElementById("id").value;
  const studentName = document.getElementById("name").value;
  const studentEmail = document.getElementById("email").value;
  const studentSoDT = document.getElementById("phone").value;
  const studentCMND = document.getElementById("idCard").value;
  const studentDiemToan = document.getElementById("math").value;
  const studentDiemLy = document.getElementById("physics").value;
  const studentDiemHoa = document.getElementById("chemistry").value;

  const newStudent = new Student(
    studentID,
    studentName,
    studentEmail,
    studentSoDT,
    studentCMND,
    studentDiemToan,
    studentDiemLy,
    studentDiemHoa
  );

  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
    method: "POST",
    data: newStudent,
  })
    .then((res) => {
      //fetch danh sách studnet mới viên
      fetchStudent();
    })
    .catch((err) => {
      console.error(err);
    });
};

//function 4: Xóa sinh vien
const deleteStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      fetchStudent();
    })
    .catch((err) => {
      console.error(err);
    });
};
//function 5: lấy thông tin của sinh viên muốn cập nhật và show lên form
const getStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
    method: "GET",
  })
    .then((res) => {
      document.getElementById("btnThem").click();
      document.getElementById("id").value = res.data.MaSV;
      document.getElementById("name").value = res.data.HoTen;
      document.getElementById("email").value = res.data.Email;
      document.getElementById("phone").value = res.data.SoDT;
      document.getElementById("idCard").value = res.data.CMND;
      document.getElementById("math").value = res.data.DiemToan;
      document.getElementById("physics").value = res.data.DiemLy;
      document.getElementById("chemistry").value = res.data.DiemHoa;
      document.getElementById("id").setAttribute("disabled", true);
    })
    .catch((err) => {
      console.error(err);
    });
};

//function 6: cập nhật thông tin sinh viên
const updateStudent = () => {
  const studentID = document.getElementById("id").value;
  const studentName = document.getElementById("name").value;
  const studentEmail = document.getElementById("email").value;
  const studentSoDT = document.getElementById("phone").value;
  const studentCMND = document.getElementById("idCard").value;
  const studentDiemToan = document.getElementById("math").value;
  const studentDiemLy = document.getElementById("physics").value;
  const studentDiemHoa = document.getElementById("chemistry").value;

  const updatedStudent = new Student(
    studentID,
    studentName,
    studentEmail,
    studentSoDT,
    studentCMND,
    studentDiemToan,
    studentDiemLy,
    studentDiemHoa
  );

  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
    method: "PUT",
    data: updatedStudent,
  })
    .then((res) => {
      //fetch danh sách  mới viên
      fetchStudent();
      //rest form
      document.getElementById("btnReset").click();
      //ẩn đi form
      document.getElementById("btnClose").click();

      //hiện lại cái ô id để update.
      document.getElementById("id").removeAttribute("disabled");
    })
    .catch((err) => {
      console.error(err);
    });
};
//goi ham
fetchStudent();
