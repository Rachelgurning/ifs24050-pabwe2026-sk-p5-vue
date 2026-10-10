import Swal from 'sweetalert2';

export function showSuccessDialog(title, text) {
  return Swal.fire({ title, text, icon: 'success', confirmButtonText: 'OK' });
}

export function showErrorDialog(title, text) {
  return Swal.fire({ title, text, icon: 'error', confirmButtonText: 'Tutup' });
}

export function showConfirmDialog(title, text) {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
  });
}

export function formatRupiah(value) {
  if (Number.isNaN(Number(value))) {
    return 'Rp 0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateString) {
  if (!dateString) return '-';

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date(dateString).toLocaleDateString('id-ID', options);
}
