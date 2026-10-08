import { render } from '@testing-library/vue';import { createPinia,setActivePinia } from 'pinia';import { createMemoryHistory,createRouter } from 'vue-router';
export function createMockPinia(){const pinia=createPinia();setActivePinia(pinia);return pinia}
export function renderWithProviders(component,options={}){const pinia=options.pinia||createMockPinia();const router=options.router||createRouter({history:createMemoryHistory(),routes:options.routes||[]});return render(component,{global:{plugins:[pinia,router]},...options})}
