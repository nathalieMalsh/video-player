import { useRef } from 'react'
import classes from './App.module.css'
import { Modal, Button } from 'antd'
import { PlayCircleOutlined, ShrinkOutlined, ArrowsAltOutlined, PauseOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useMachine } from '@xstate/react'
import { playerMachine } from './playerMachine'
import ReactPlayer from 'react-player'
import { modalStyles } from './modalStyles'

const App = () => {
  const playerRef = useRef(null)
  const [state, send] = useMachine(
    playerMachine.provide({
      actions: {
        stopVideo: () => {
          playerRef.current?.pause?.()
        }
      }
    })
  )

  const isPlayerOpened = state.matches('opened')
  const isVideoPlaying = state.matches({ opened: { video: 'playing' } })
  const isModalFull = state.matches({ opened: { size: 'full' } })

  return (
    <div className={classes.app}>
      <div className={classes.closedModal}>
        <PlayCircleOutlined className={classes.icon} onClick={() => send({ type: 'open' })} />
        <Modal
          styles={modalStyles}
          open={isPlayerOpened}
          title='PLAYER'
          width={isModalFull ? 1000 : 500}
          onCancel={() => send({ type: 'close' })}
          footer={[
            <Button shape='circle' key='size'
              icon={isModalFull ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
              onClick={() => send({ type: 'toggle' })}
            />,
            <Button shape='circle' key='pause'
              icon={isVideoPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
              onClick={isVideoPlaying ? () => send({ type: 'pause' }) : () => send({ type: 'play' })} />
          ]}
        >
          <ReactPlayer
            ref={playerRef}
            src='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
            playing={isVideoPlaying}
            loop={true}
            width='100%'
            height='100%'
          />
        </Modal>
      </div>
    </div>
  )
}

export default App
