import { ref } from 'vue';

export function useInput(defaultValue = '') {
  const value = ref(defaultValue);
  const onChange = (event) => {
    value.value = event.target ? event.target.value : event;
  };
  return [value, onChange];
}