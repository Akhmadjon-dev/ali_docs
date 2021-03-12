import styled from 'styled-components'

const S = {}

S.Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
    padding: 20px;

`

S.Card = styled.div`
    background-color: #f0f2f7;;
    border: none;
    border-radius: 20px;
    padding: 20px;
    transition: 0.3s;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0px 5px 10px #d0d2da;
        transform: translateY(-5px);
    }

    .card__icon {
        font-Size: 35px;

        & > span {
            background: #fff;
            padding: 10px;
            border-radius: 20px;
        }

        & svg {
            fill: #6f6fff;
        }
    }

    .card__title {
        margin: 0;  
        margin-top: 40px;
        color: grey;
        font-size: 14px;
        font-weight: 600;
    }

    .card__qty {
        color: black;
        font-weight: 600;
        font-size: 18px;
        margin: 0;
    }
`

export default S