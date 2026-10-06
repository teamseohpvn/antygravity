// Kiểu cho biến dùng chung giữa middleware và trang (Astro.locals).
declare namespace App {
  interface Locals {
    /** Tên người đăng nhập trang quản trị giá (ghi vào nhật ký đổi giá). */
    adminUser?: string;
    /** true khi API quản trị đang render lại trang bảng giá để xuất bản tĩnh. */
    taoLaiTrangTinh?: boolean;
  }
}
