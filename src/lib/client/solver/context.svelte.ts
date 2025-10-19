import { createContext } from 'svelte';

export class Solver {
	formId = $state(0);
}

const [getSolverContext, setSolverContext] = createContext<Solver>();

export { getSolverContext, setSolverContext };
