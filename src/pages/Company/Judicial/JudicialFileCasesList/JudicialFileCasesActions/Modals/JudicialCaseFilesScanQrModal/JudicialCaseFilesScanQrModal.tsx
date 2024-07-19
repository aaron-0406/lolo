import Container from "@/ui/Container";
import Modal from "@/ui/Modal"
import Text from "@/ui/Text";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import paths from "shared/routes/paths";
import { useLoloContext } from "@/contexts/LoloProvider";

type Props = {
  isVisible: boolean
  onClose: () => void    
}

const JudicialCaseFilesScanQrModal = ( { isVisible, onClose }: Props ) => {
  const [data, setData] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    client: { customer },
  } = useLoloContext()


  const onNavigateToFileCase = (numberCaseFile: string) => {
    setData(numberCaseFile)
    navigate(`${paths.judicial.detallesExpediente(customer.urlIdentifier, numberCaseFile)}`)
  }
  return (
    <Modal
      id="judicial-case-files-scan-qr-modal"
      title="Escanea código QR"
      onClose={onClose}
      visible={isVisible}
      size="small"
      footer={null}
    >
      <StyledContainer>
        <Scanner
          onScan={(result) => onNavigateToFileCase(result[0].rawValue)}
          formats={['qr_code']}
          components={{
            audio: true,
            finder: false,
            torch: true,
            tracker: (detectedCodes, ctx) => {
              detectedCodes.forEach((code) => {
                ctx.strokeStyle = '#00ff2a'
                ctx.lineWidth = 4
                ctx.strokeRect(code.boundingBox.x, code.boundingBox.y, code.boundingBox.width, code.boundingBox.height)
              })
            },
            zoom: true,
          }}
          styles={{
            container: {
              width: '100%',
              justifyContent: 'center',
              alignItems: 'start',
              display: 'flex',
              height: '100%',
              borderEndEndRadius: 10,
              borderEndStartRadius: 10,
              overflow: 'hidden',

              },
              video: {
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'start',
                display: 'flex',
                width: '100%',
                height: '100%',
                borderRadius: 20,
            },
            finderBorder: 2,
          }}
        ></Scanner>
        {data ? <div className="scanner__data">
          <Text.Body size="m" weight="regular" color="Neutral9">
            Expediente encontrado: {data}
          </Text.Body>
        </div> : null}
      </StyledContainer>
    </Modal>
  )
}


export default JudicialCaseFilesScanQrModal

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 375px ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow: hidden;
      .sacnner__container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .scanner__data {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 40%; 
        height: 40%;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        background-color: ${theme.colors.Neutral0};
        opacity: 0.9;
        color: ${theme.colors.Neutral9};
        padding: 10px;
        border-radius: 5px;
      }
    @media ${theme.device.tabletS} {
      position: relative;
    width: 100%;
    height: 450px ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow: hidden;
    }
  `}
`