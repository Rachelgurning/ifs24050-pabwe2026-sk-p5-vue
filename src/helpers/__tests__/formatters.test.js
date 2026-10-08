import { describe, it, expect } from 'vitest';
import { formatRupiah } from '../formatters';

describe('Formatters Helper', () => {
  it('mengubah angka menjadi format Rupiah dengan benar', () => {
    expect(formatRupiah(500000)).toContain('500.000');
  });
});