const express = require("express");
const router = express.Router();

const bookingTourController = require("../../components/bookingtour/BookingTourController");
const accountController = require("../../components/account/AccountController");

//Fomat thời gian
function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}

// Lấy tất cả bookingTour
// http://localhost:3000/api/bookingtour/getAllBookingTours

router.get("/getAllBookingTours", async (req, res) => {
  try {
    const bookingTours = await bookingTourController.getAllBookingTours();
    return res.status(200).json({
      result: true,
      bookingTours: bookingTours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      bookingTours: [],
    });
  }
});

// Lấy tất cả bookingTour theo user
// http://localhost:3000/api/bookingtour/getAllBookingToursByUser?user_id=

router.get("/getAllBookingToursByUser", async (req, res) => {
  try {
    const bookingTours = await bookingTourController.getAllBookingToursByUser(
      req.query.user_id
    );
    return res.status(200).json({
      result: true,
      bookingTours: bookingTours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      bookingTours: [],
    });
  }
});

// Đặt tour
// http://localhost:3000/api/bookingtour/addNewBookingTour

router.post("/addNewBookingTour", async (req, res) => {
  try {
    const {
      user_id,
      tour_id,
      discount,
      adult_count,
      child_count,
      price,
      note,
      role,
      location_custom,
    } = req.body;

    const bookingTour = await bookingTourController.addNewBookingTour(
      user_id,
      tour_id,
      discount,
      adult_count,
      child_count,
      price,
      note,
      role,
      location_custom
    );


    if (bookingTour) {
        let listDiaDiem = [];
        const diaDiem = bookingTour.location_custom.forEach(element => {
            listDiaDiem += element.name + ", ";
        });;
      const user = await accountController.getAccountById(user_id);
      let content = `
      <div class="es-wrapper-color">
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td class="esd-email-paddings" valign="top">
                    <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0"
                                        cellspacing="0" width="600">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="560" class="es-m-p0r esd-container-frame"
                                                                    valign="top" align="center">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center"
                                                                                    class="esd-empty-container"
                                                                                    style="display: none;"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-content-body" style="background-color: #dee2e6;" width="600"
                                        cellspacing="0" cellpadding="0" align="center" bgcolor="#dee2e6">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure" align="left">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="600" class="esd-container-frame"
                                                                    align="center" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center"
                                                                                    class="esd-block-image"
                                                                                    style="font-size: 0px;"><a
                                                                                        target="_blank"><img
                                                                                            class="adapt-img"
                                                                                            src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/19771615363902605.png"
                                                                                            alt style="display: block;"
                                                                                            width="600"></a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-structure es-p20" align="left">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="560" align="left"
                                                                    class="esd-container-frame">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left"
                                                                                    class="esd-block-text es-p10t es-m-p20l es-m-txt-l">
                                                                                    <h1 style="line-height: 100%;">ĐẶT
                                                                                        TOUR THÀNH CÔNG</h1>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="left"
                                                                                    class="esd-block-text es-p10t es-p10b es-m-p20l">
                                                                                    <p style="line-height: 120%;">Cảm ơn
                                                                                        đã lựa chọn chúng tôi.</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-structure" align="left">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr class="es-mobile-hidden">
                                                                <td width="600" class="esd-container-frame"
                                                                    align="center" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center"
                                                                                    class="esd-block-image"
                                                                                    style="font-size: 0px;"><a
                                                                                        target="_blank"><img
                                                                                            class="adapt-img"
                                                                                            src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/64791615363894061.png"
                                                                                            alt style="display: block;"
                                                                                            width="600"></a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center" esd-custom-block-id="290333">
                                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                        cellspacing="0" width="600">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20t es-p10b es-p20r es-p20l es-m-p10t"
                                                    align="left" style="background: rgb(222,226,230);
background: linear-gradient(0deg, rgba(222,226,230,1) 59%, rgba(255,255,255,1) 59%);">
                                                    <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="176" class="esd-container-frame es-m-p20b"
                                                                    align="center" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center"
                                                                                    class="esd-block-image"
                                                                                    style="font-size: 0px;"><img
                                                                                        src="${bookingTour.tour_id.image}"
                                                                                        alt="Brianna Riley Butler"
                                                                                        style="display: block;"
                                                                                        width="176"
                                                                                        title="Brianna Riley Butler">
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table cellpadding="0" cellspacing="0" class="es-right"
                                                        align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td width="364" align="left"
                                                                    class="esd-container-frame">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left"
                                                                                    class="esd-block-text es-p5b es-m-txt-c">
                                                                                    <span style="line-height: 120%;">
                                                                                        ${bookingTour.tour_id.name}</span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="left"
                                                                                    class="esd-block-text es-m-txt-c">
                                                                                    <span><b>Điểm đến:</b>
                                                                                        ${bookingTour.tour_id.departure_location}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="left"
                                                                                    class="esd-block-text es-m-txt-c">
                                                                                    <span><b>Các địa điểm:</b>
                                                                                        ${listDiaDiem}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-menu"
                                                                                    esd-tmp-menu-padding="20|5"
                                                                                    esd-tmp-menu-size="width|14">
                                                                                    <table cellpadding="0"
                                                                                        cellspacing="0" width="100%"
                                                                                        class="es-menu">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                class="links-images-left">
                                                                                                <td align="left"
                                                                                                    valign="top"
                                                                                                    width="100%"
                                                                                                    class="es-p10t es-p10b es-p5r es-p5l"
                                                                                                    style="padding-top: 20px; padding-bottom: 5px;">
                                                                                                    <span><b>Số
                                                                                                            lượng:</b>
                                                                                                        ${bookingTour.adult_count}
                                                                                                        người lớn +
                                                                                                        ${bookingTour.child_count}
                                                                                                        trẻ em</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-menu"
                                                                                    esd-tmp-menu-padding="5|5"
                                                                                    esd-tmp-menu-size="width|14">
                                                                                    <table cellpadding="0"
                                                                                        cellspacing="0" width="100%"
                                                                                        class="es-menu">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                class="links-images-left">
                                                                                                <td align="left"
                                                                                                    valign="top"
                                                                                                    width="100%"
                                                                                                    class="es-p10t es-p10b es-p5r es-p5l"
                                                                                                    style="padding-top: 5px; padding-bottom: 5px;">
                                                                                                    <span><b>Ngày
                                                                                                            đi:</b>
                                                                                                        ${formatDateString(bookingTour.tour_id.departure_date)}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-menu"
                                                                                    esd-tmp-menu-padding="5|5"
                                                                                    esd-tmp-menu-size="width|14">
                                                                                    <table cellpadding="0"
                                                                                        cellspacing="0" width="100%"
                                                                                        class="es-menu">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                class="links-images-left">
                                                                                                <td align="left"
                                                                                                    valign="top"
                                                                                                    width="100%"
                                                                                                    class="es-p10t es-p10b es-p5r es-p5l"
                                                                                                    style="padding-top: 5px; padding-bottom: 5px;">
                                                                                                    <span><b>Tổng số
                                                                                                            tiền:</b>
                                                                                                        ${bookingTour.price}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-structure" align="left"
                                                    background="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/38081615362904632.png"
                                                    style="background-image: url(https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/38081615362904632.png); background-repeat: no-repeat; background-position: right top;">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="600" class="esd-container-frame"
                                                                    align="center" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="right"
                                                                                    class="esd-block-social es-p10b es-p20r es-p20l"
                                                                                    style="font-size:0">
                                                                                    <table cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        class="es-table-not-adapt es-social">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center"
                                                                                                    valign="top"
                                                                                                    class=""><a
                                                                                                        target="_blank"
                                                                                                        href="https://www.facebook.com/profile.php?id=100092587672754"><img
                                                                                                            title="Facebook"
                                                                                                            src="https://hpy.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                                                                                            alt="Fb"
                                                                                                            width="24"
                                                                                                            height="24">Facebook</a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0"
                                        cellspacing="0" width="600">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20" align="left" bgcolor="#ffffff"
                                                    style="background-color: #ffffff;">
                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="270" class="es-m-p20b esd-container-frame"
                                                                    align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center"
                                                                                    class="esd-empty-container"
                                                                                    style="display: none;"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
      `;

      const sendMail = await accountController.sendEmail(user.email, 'Đặt tour thành công', content)

      return res.status(200).json({
        result: true,
        message: "Đặt tour thành công",
        bookingTour: bookingTour,
      });
    }

    return res.status(400).json({
      result: false,
      message: "Đặt tour thất bại",
      bookingTour: {},
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      bookingTour: {},
    });
  }
});

// Gửi mail
router.post(
  '/sendmail',
  async (req, res, next) => {
    try {
      const { email, subject } = req.body;
      let content = `<div class="es-wrapper-color">
          <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                  <v:fill type="tile" color="#f6f6f6"></v:fill>
              </v:background>
          <![endif]-->
          <table class="es-wrapper" width="${email}" cellspacing="0" cellpadding="0">
              <tbody>
                  <tr>
                      <td class="esd-email-paddings" valign="top">
                          <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" style="background-color: #dee2e6;" width="600" cellspacing="0" cellpadding="0" align="center" bgcolor="#dee2e6">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/19771615363902605.png" alt style="display: block;" width="600"></a></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p20" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" align="left" class="esd-container-frame">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="left" class="esd-block-text es-p10t es-m-p20l es-m-txt-l">
                                                                                          <h1 style="line-height: 100%;">WELCOME TO STORE</h1>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="left" class="esd-block-text es-p10t es-p10b es-m-p20l">
                                                                                          <p style="line-height: 120%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr class="es-mobile-hidden">
                                                                      <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/64791615363894061.png" alt style="display: block;" width="600"></a></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="290333">
                                          <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20t es-p10b es-p20r es-p20l es-m-p10t" align="left" style="background: rgb(222,226,230);
  background: linear-gradient(0deg, rgba(222,226,230,1) 59%, rgba(255,255,255,1) 59%);">
                                                          <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="176" valign="top"><![endif]-->
                                                          <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="176" class="esd-container-frame es-m-p20b" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://demo.stripocdn.email/content/guids/73f4f0b4-f4aa-44b3-96b0-000a03225661/images/z3768022131980_9ddcb0be0fe5b0b96b5b8c6219a4c16f.jpg" alt="Brianna Riley Butler" style="display: block;" width="176" title="Brianna Riley Butler"></a></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="364" valign="top"><![endif]-->
                                                          <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="364" align="left" class="esd-container-frame">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="left" class="esd-block-text es-p5b es-m-txt-c">
                                                                                          <p style="line-height: 120%;">Manager</p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="left" class="esd-block-text es-m-txt-c">
                                                                                          <h3>Huỳnh Phi Long<br></h3>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-menu" esd-tmp-menu-padding="20|5" esd-tmp-menu-size="width|14">
                                                                                          <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                              <tbody>
                                                                                                  <tr class="links-images-left">
                                                                                                      <td align="left" valign="top" width="100%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 20px; padding-bottom: 5px;"><a target="_blank" href="tel:+00012345678"><img src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/66281615363445167.png" alt="0943055138" title="0943055138" align="absmiddle" class="es-p15r" width="14">0943055138</a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-menu-size="width|14">
                                                                                          <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                              <tbody>
                                                                                                  <tr class="links-images-left">
                                                                                                      <td align="left" valign="top" width="100%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="mailto:brianna_rilley@mail.com"><img src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/13561615363445462.png" alt="long09102003hpl@gmail.com" title="long09102003hpl@gmail.com" align="absmiddle" class="es-p15r" width="14">long09102003hpl@gmail.com</a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-menu-size="width|14">
                                                                                          <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                              <tbody>
                                                                                                  <tr class="links-images-left">
                                                                                                      <td align="left" valign="top" width="100%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://viewstripo.email"><img src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/90691615363445442.png" alt="Quận 12" title="Quận 12" align="absmiddle" class="es-p15r" width="14">Quận 12</a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-menu-size="width|14">
                                                                                          <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                              <tbody>
                                                                                                  <tr class="links-images-left">
                                                                                                      <td align="left" valign="top" width="100%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://viewstripo.email"><img src="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/3821615363445442.png" alt="longdzvippro1no.com" title="longdzvippro1no.com" align="absmiddle" class="es-p15r" width="14">longdzvippro1no.com</a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure" align="left" background="https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/38081615362904632.png" style="background-image: url(https://hpy.stripocdn.email/content/guids/CABINET_49dfe12d15540c5305189b31261e3827/images/38081615362904632.png); background-repeat: no-repeat; background-position: right top;">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="right" class="esd-block-social es-p10b es-p20r es-p20l" style="font-size:0">
                                                                                          <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td align="center" valign="top" class=" es-p25r"><a target="_blank" href="https://viewstripo.email"><img title="Facebook" src="https://hpy.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="24" height="24"></a></td>
                                                                                                      <td align="center" valign="top" class=" es-p25r"><a target="_blank" href="https://viewstripo.email"><img title="Twitter" src="https://hpy.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="24" height="24"></a></td>
                                                                                                      <td align="center" valign="top" class=" es-p25r"><a target="_blank" href="https://viewstripo.email"><img title="Instagram" src="https://hpy.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="24" height="24"></a></td>
                                                                                                      <td align="center" valign="top"><a target="_blank" href="https://viewstripo.email"><img title="Youtube" src="https://hpy.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="24" height="24"></a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                          <!--[if mso]><table width="560" cellpadding="0" 
                          cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                          <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="270" class="es-m-p20b esd-container-frame" align="left">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                          <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="270" align="left" class="esd-container-frame">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-social es-p20t" style="font-size:0">
                                                                                          <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://viewstripo.email."><img title="Facebook" src="https://hpy.stripocdn.email/content/assets/img/social-icons/square-black-bordered/facebook-square-black-bordered.png" alt="Fb" width="32"></a></td>
                                                                                                      <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://viewstripo.email."><img title="Twitter" src="https://hpy.stripocdn.email/content/assets/img/social-icons/square-black-bordered/twitter-square-black-bordered.png" alt="Tw" width="32"></a></td>
                                                                                                      <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://viewstripo.email."><img title="Instagram" src="https://hpy.stripocdn.email/content/assets/img/social-icons/square-black-bordered/instagram-square-black-bordered.png" alt="Inst" width="32"></a></td>
                                                                                                      <td align="center" valign="top"><a target="_blank" href="https://viewstripo.email."><img title="Youtube" src="https://hpy.stripocdn.email/content/assets/img/social-icons/square-black-bordered/youtube-square-black-bordered.png" alt="Yt" width="32"></a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p25t es-p25b es-p20r es-p20l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-infoblock">
                                                                                          <p>You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).<br><a target="_blank" href="https://viewstripo.email">Privacy police</a> |<a target="_blank" href="https://viewstripo.email">Unsubscribe</a></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image es-infoblock made_with" style="font-size:0"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=fashion_8&utm_content=hot_prices"><img src="https://hpy.stripocdn.email/content/guids/CABINET_09023af45624943febfa123c229a060b/images/7911561025989373.png" alt width="125" style="display: block;"></a></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>`;
      const result = await userController.sendEmail(email, subject, content);
      return res.status(200).json({ result });
    } catch (error) {
      console.log("Sendmail error: " + error);
      return res.status(500).json({ result: false });
    }

  }
)



// lấy danh sách tour theo tour_id và role
// http://localhost:3000/api/bookingtour/getAllBookingToursByTourId?tour_id=

router.get("/getAllBookingToursByTourId", async (req, res) => {
  try {
    const bookingTours = await bookingTourController.getAllBookingToursByTourId(
      req.query.tour_id
    );
    let quantity = 0;

    if (bookingTours.length === 0) {
      return res.status(200).json({
        result: true,
        quantity: quantity,
      });
    } else {
      bookingTours.forEach((bookingTour) => {
        quantity += bookingTour.adult_count + bookingTour.child_count;
      });
      return res.status(200).json({
        result: true,
        quantity: quantity,
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: false,
      quantity: 0,
    });
  }
});

module.exports = router;
