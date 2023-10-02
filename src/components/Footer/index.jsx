import { Divider } from "antd";

function Footer(props) {
    return (
        <div>
            <span style={{ fontWeight: 'bold' }}>Mọi góp ý, thắc mắc xin liên hệ:</span> Phòng dịch vụ sinh viên: Email: <span style={{ color: '#338fd0' }}>dichvusinhvien@fe.edu.vn</span>. Điện thoại: <span style={{ fontWeight: 'bold' }}>(024)7308.13.13</span>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ textAlign: 'center' }}>
                © Powered by <span style={{ color: '#338fd0' }}>FPT University</span> | <span style={{ color: '#338fd0' }}>CMS</span> | <span style={{ color: '#338fd0' }}>library</span> | <span style={{ color: '#338fd0' }}>books24x7</span>
            </div>
        </div>
    );
}

export default Footer;