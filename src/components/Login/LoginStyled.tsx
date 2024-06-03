import styled, { css } from 'styled-components'
import Container from '@/ui/Container'
import login from "@/assets/images/login.jpeg"

export const StyledLoginContainer = styled(Container)`
  ${({ theme }) => css`
    box-sizing: border-box;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;

    .login__form-container {
      margin-top: 2rem;
      width: 100%;
      min-height: 70vh;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .login__header {
        position: fixed;
        width: 100%;
        background-color: white;
        display: flex;
        gap: 0px;
        align-items: center;
        top: 0px;
        left: 2px;
        box-shadow: ${theme.shadows.elevationHigh};

        .login__header-img {
          width: 70px;
          height: auto;
        }
      }
      .login__form {
        max-width: 500px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 50px 23px;

        .login__form--qr {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .login__form--fields {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
      }
    }
    .content__container {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 350px;
      overflow: hidden;

      .content__balls-container {
        display: none;
        position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: white;
        filter: blur(1.5rem);

        .content__ball-first {
          position: absolute;
          width: 100%;
          height: 100%;
          max-width: 700px;
          max-height: 700px;
          border-radius: 100%;
          background-color: ${theme.colors.Primary2};
          transform: translate(-45%, -45%);
        }
        .content__ball-second {
          position: absolute;
          width: 100%;
          height: 100%;
          max-width: 700px;
          max-height: 700px;
          border-radius: 100%;
          background-color: ${theme.colors.Primary3};
          transform: translate(45%, 45%);
          right: 0;
          bottom: 0;
        }
      }

      .info__container {
        box-sizing: border-box;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        top: 50%;
        right: 0;
        transform: translate(0%, -50%);
        width: 100vw;
        height: 100%;
        min-height: 325px;
        border-start-start-radius: 0.2rem;
        border-end-start-radius: 0.2rem;
        box-shadow: ${theme.shadows.elevationHigh};
        background-image: url(${login});
        background-size: cover;
        background-color: #cccccc;
        overflow: hidden;

        .info__cover {
          width: 100%;
          height: 100%;
          background-color: ${theme.colors.Primary5};
          opacity: 0.7;
        }

        .info__text-container {
          box-sizing: border-box;
          z-index: 30;
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          gap: 15px;
          padding: 0px 6px;
          top: 0;
          left: 0;
          width: fit-content;
          height: 100%;
        }
        .info__text-title {
          color: white;
          width: fit-content;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: start;
        }
        .info__text-title--sub {
          color: white;
          font-size: 1rem;
          font-weight: 500;
          text-align: start;
        }
      }
    }

    @media ${theme.device.desktopS} {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .login__form-container {
        margin-top: 0rem;
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .login__header {
          position: fixed;
          display: flex;
          gap: 0px;
          align-items: center;
          top: 0px;
          left: 2px;
          box-shadow: none;

          .login__header-img {
            width: 70px;
            height: auto;
          }
        }
        .login__form {
          max-width: 500px;
          max-height: 600px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 23px;

          .login__form--qr {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .login__form--fields {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
        }
      }
      .content__container {
        position: relative;
        flex: 60%;
        height: 100%;
        overflow: hidden;

        .content__balls-container {
          display: flex;
          position: relative;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: white;
          filter: blur(1.5rem);

          .content__ball-first {
            position: absolute;
            width: 100%;
            height: 100%;
            max-width: 700px;
            max-height: 700px;
            border-radius: 100%;
            background-color: ${theme.colors.Primary2};
            transform: translate(-45%, -45%);
          }
          .content__ball-second {
            position: absolute;
            width: 100%;
            height: 100%;
            max-width: 700px;
            max-height: 700px;
            border-radius: 100%;
            background-color: ${theme.colors.Primary3};
            transform: translate(45%, 45%);
            right: 0;
            bottom: 0;
          }
        }

        .info__container {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
          top: 50%;
          right: 0;
          transform: translate(0%, -50%);
          width: 50vw;
          height: 45vw;
          border-start-start-radius: 0.2rem;
          border-end-start-radius: 0.2rem;
          box-shadow: ${theme.shadows.elevationHigh};
          background-image: url(${login});
          background-size: cover;
          background-color: #cccccc;
          overflow: hidden;

          .info__cover {
            width: 100%;
            height: 100%;
            background-color: ${theme.colors.Primary5};
            opacity: 0.7;
          }

          .info__text-container {
            z-index: 30;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            padding: 0px 15px;
            gap: 15px;
            top: 50%;
            right: 0;
            transform: translate(0%, -50%);
            width: 100%;
            height: 100%;
          }
          .info__text-title {
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
          }
          .info__text-title--sub {
            color: white;
            font-size: 1.5rem;
            font-weight: 500;
            text-align: center;
          }
        }
      }
    }
  `}
`
