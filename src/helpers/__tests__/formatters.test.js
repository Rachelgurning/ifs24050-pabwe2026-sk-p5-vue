import { describe, it, expect } from 'vitest';
import { formatRupiah } from '../formatters';

describe('Formatters Helper', () => {
  it('mengubah angka menjadi format Rupiah dengan benar', () => {
    expect(formatRupiah(500000)).toContain('500.000');
  });

  it('mengembalikan Rp 0 untuk teks non-numerik', () => {
    expect(formatRupiah('abc')).toBe('Rp 0');
  });

  it('mengembalikan Rp 0 untuk undefined', () => {
    expect(formatRupiah(undefined)).toBe('Rp 0');
  });

  it('memformat angka nol', () => {
    expect(formatRupiah(0)).toContain('0');
  });

  it('memformat string angka', () => {
    expect(formatRupiah('25000')).toContain('25.000');
  });

  it('memformat angka desimal tanpa digit pecahan', () => {
    expect(formatRupiah(1500.75)).toContain('1.501');
  });
});