import { createMachine } from 'xstate'

export const playerMachine = createMachine({
  id: 'player',
  initial: 'closed', // closed/open
  states: {
    closed: {
      on: {
        click: 'open'
      }
    },
    open: {
      on: {
        close: 'closed',
      }
    }
  }
});