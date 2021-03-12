import styled from 'styled-components'

export default styled.div`
    .ant-spin.ant-spin-lg.ant-spin-spinning{
        position: fixed;
        display: inline-block;
        opacity: 1;
        top: 50%;
        transform: translate(50%, -50%);
        left: 50%;
    }
    .ant-spin-dot.ant-spin-dot-spin{
        font-size: 70px !important;
        positon: absolute;

        i {
            width: 20px !important;
            height: 20px !important;
    }
}
`