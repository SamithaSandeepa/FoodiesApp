import { createContext, useContext, useState, useEffect } from "react";
import Loading from "react-fullscreen-loading";

const StateContext = createContext({
  loading: null,
  setLoading: () => {},
});

const CustomLoading = ({ loading }) => (
  <>
    {loading && (
      <div className="custom-loading">
        <Loading loading background="#ffffffb8" loaderColor="#0093E9" />
      </div>
    )}
    <style jsx>{`
      .custom-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffffb8;
        z-index: 9999;
      }

      .custom-loading-img {
        max-width: 5%;
        max-height: 5%;
        animation: zoom-in-out 1s linear infinite;
      }

      @keyframes zoom-in-out {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
    `}</style>
  </>
);

export const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const gradient = "linear-gradient(to right, #0093E9, #80D0C7)";

  return (
    <StateContext.Provider
      value={{
        setLoading,
        loading,
      }}
    >
      <CustomLoading
        loading={loading}
        // background="#ffffffb8"
        // loaderColor={gradient}
      />
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
