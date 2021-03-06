import { THROW_YUT, START_GAME, boardContext } from 'Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import Horses from 'Component/GameComponent/Yut/Horses'
import { NEXT_TURN } from 'Container/GameContainer/Yut/YutStore';
import HaltButton from './HaltButton';
import { PeersContext } from 'Routes/peerStore';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { stateContext } from 'Container/GameContainer/Yut/YutStore';
import reducerAction from 'Container/GameContainer/Yut/reducerAction';
import reducerActionHandler from 'Container/GameContainer/Yut/reducerActionHandler';



const StyleDiv = styled.div`
    display:flex;
    height:30px;
    flex-direction: row;
    margin:10px;
`;

const PlayerSection = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    width:500px;
    margin:20px;

`;

const Player = styled.div`
    padding:10px;
    margin:0px;
`;

const App = () => {
    const { myThrowCount, yutData, playerData, halted, dispatch } = useContext(boardContext);
    const { peers } = useContext(PeersContext);
    // const halted = false;
    const nickname = localStorage.getItem('nickname');
    // const [sendRequest, setSendRequest] = useState(false);
    const state = useContext(stateContext);
    // const dispatchHandler = async () => {
    //     await Promise.all([
    //         dispatch({ type: START_GAME, peers }),
    //     ])
    //     // await Promise.all([
    //     sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state })
    //     // ])
    //     console.log("state3 : ", state)
    // }

    // useEffect(() => {
    //     if (sendRequest) {
    //         //send the request
    //         dispatch({ type: START_GAME, peers })
    //         console.log("after dispatch start Game : ", state)
    //         const test = (state) => sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state });
    //         test(state)
    //         setSendRequest(false);
    //     }
    // },
    //     [sendRequest]);


    return (
        <div>
            <button onClick={() => reducerActionHandler.startGameHandler({ dispatch, peers })}>?????? ??????</button>
            <HaltButton dispatch={dispatch} state={state} peers={peers} halted={halted} handlerType={'throwYutHandler'} name={'??? ?????????'} />
            <HaltButton dispatch={dispatch} state={state} peers={peers} halted={halted} handlerType={'nextTurnHandler'} name={'?????? ???'} />
            <StyleDiv>?????? ??? ??? ?????? ??? :
                {
                    yutData.map((i, index) => <button key={index}>{i} </button>)
                }
            </StyleDiv>
            <div>??? ?????? ??? ?????? ?????? : {myThrowCount}</div>
            <PlayerSection>
                {playerData.map((i, index) => <Player key={index}>
                    <div>????????? : {
                        <div>{i.nickname}</div>
                    }</div>
                    <div style={{ "height": "60px" }} >
                        ?????? ?????? :
                        <Horses player={i} index={0} horses={i.horses} />
                    </div>
                    <div>?????? ?????? : {i.goal}</div>
                    <p />
                </Player>)}
            </PlayerSection>
        </div >
    )
}
export default memo(App);