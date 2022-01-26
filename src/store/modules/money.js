import LocalStorageService from '@/services/localStorage.service';
import chartData from '@/data/chartData';

export default {
  state: {
    salary: LocalStorageService.getNumber('salary'),
    taxes: LocalStorageService.getNumber('taxes'),
    basicExpenses: LocalStorageService.getArray('basicExpenses'),
  },
  getters: {
    salary: (state) => state.salary,
    taxes: (state) => state.taxes,
    basicExpenses: (state) => state.basicExpenses,
    netSalary: (state) => +(state.salary - (state.taxes / 100) * state.salary).toFixed(1),
    freeMoney: (state, getters) => +(getters.netSalary - getters.plannedExpenses).toFixed(1),
    freeMoneyPercent: (state, getters) => +((getters.freeMoney / getters.netSalary) * 100).toFixed(0),
    consideredExpenses: (state) => state.basicExpenses.filter((expense) => expense.considered),
    plannedExpenses:
      (state, getters) => getters.consideredExpenses.reduce((acc, cur) => acc + cur.amount, 0),
    labels: (state, getters) => getters.consideredExpenses.map((expense) => expense.name),
    series: (state, getters) => getters.consideredExpenses.map((expense) => expense.amount),
    options: (state, getters) => ({
      labels: getters.labels,
      ...chartData,
    }),
  },
  mutations: {
    setSalary(state, salary) {
      state.salary = salary;
      LocalStorageService.setItem('salary', salary);
    },
    setTaxes(state, taxes) {
      state.taxes = taxes;
      LocalStorageService.setItem('taxes', taxes);
    },
    addBasicExpense(state, expense) {
      state.basicExpenses.push({ ...expense, considered: true });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
    },
    deleteBasicExpense(state, index) {
      state.basicExpenses.splice(index, 1);
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
    },
    switchBasicExpense(state, index) {
      state.basicExpenses.forEach((expense, i) => {
        if (i === index) {
          expense.considered = !expense.considered;
        }
      });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
    }
  },
  actions: {
    setSalary({ commit }, salary) {
      commit('setSalary', salary);
    },
    setTaxes({ commit }, taxes) {
      commit('setTaxes', taxes);
    },
    addBasicExpense({ commit }, expense) {
      commit('addBasicExpense', expense);
    },
    deleteBasicExpense({ commit }, index) {
      commit('deleteBasicExpense', index);
    },
    switchBasicExpense({ commit }, index) {
      commit('switchBasicExpense', index);
    },
  },
};