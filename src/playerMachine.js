import { createMachine } from 'xstate'

export const playerMachine = createMachine({
  id: 'player',
  initial: 'closed', // closed/opened
  states: {
    closed: {
      on: {
        open: 'opened'
      }
    },
    opened: {
      type: 'parallel',
      exit: 'stopVideo',
      on: {
        close: 'closed'
      },
      states: {
        video: {
          initial: 'playing',
          states: {
            paused: {
              on: {
                play: 'playing'
              }
            },
            playing: {
              on: {
                pause: 'paused'
              }
            }
          }
        },
        size: {
          initial: 'full',
          states: {
            full: {
              on: {
                toggle: 'mini'
              }
            },
            mini: {
              on: {
                toggle: 'full'
              }
            }
          }
        }
      }
    }
  }
});