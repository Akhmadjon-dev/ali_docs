import styled from 'styled-components'

const S = {}

S.Wrapper = styled.div`
    width: 100%;
    padding: 20px;
    height: 100px;
`

S.List = styled.div`
    width: 100%;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-shadov: 0px 2px 10px  #d0d2da;
    border-radius: 4px;
    margin-bottom: 15px;

    h4, p {
        margin: 0;
    }

    
`

export default S;