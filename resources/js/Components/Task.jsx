import React from "react";

export const Box = ({
  title,
  description,
  assignedto,
  createdby,
  status
}) => {
  return (
    <div className="w-[1300px] h-[65px] ml-auto mr-auto">
      <div className="fixed w-[1407px] h-[65px]">
        <div className="w-[1300px] h-[65px] bg-white relative rounded-[10px] flex items-center px-8 border border-gray-200 shadow">
          {/* Main Task Info */}
          <div className="flex items-center justify-center ml-4 mr-8">
            <svg
              width="25"
              height="23"
              viewBox="0 0 25 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.7273 3.657L9.76136 16.79L4.94318 11.914L6.54545 10.2925L9.76136 13.547L21.125 2.047L22.7273 3.657ZM11.3636 20.7C6.35227 20.7 2.27273 16.5715 2.27273 11.5C2.27273 6.4285 6.35227 2.3 11.3636 2.3C13.1477 2.3 14.8182 2.829 16.2273 3.7375L17.875 2.07C15.9654 0.721103 13.6924 -0.00149699 11.3636 2.32847e-06C5.09091 2.32847e-06 0 5.152 0 11.5C0 17.848 5.09091 23 11.3636 23C13.3295 23 15.1818 22.494 16.7955 21.597L15.0909 19.872C13.9545 20.401 12.6932 20.7 11.3636 20.7ZM19.3182 14.95H15.9091V17.25H19.3182V20.7H21.5909V17.25H25V14.95H21.5909V11.5H19.3182V14.95Z"
                fill="#2563eb"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="font-normal text-gray-900 text-base truncate">
              {title ?? null}
            </div>
            <p className="font-normal text-gray-500 text-xs truncate">
              {description ?? null}
            </p>
          </div>
          {/* To User */}
          <div className="flex items-center justify-center ml-4">
            <div className="w-[150px] h-7 bg-gray-100 rounded-[10px] flex items-center px-2 border border-gray-200">
              <svg
                className="mr-1 ml-2"
                width="14"
                height="14"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1.25C5.6875 1.25 6.25 1.8125 6.25 2.5C6.25 3.1875 5.6875 3.75 5 3.75C4.3125 3.75 3.75 3.1875 3.75 2.5C3.75 1.8125 4.3125 1.25 5 1.25ZM5 7.5C6.6875 7.5 8.625 8.30625 8.75 8.75H1.25C1.39375 8.3 3.31875 7.5 5 7.5ZM5 0C3.61875 0 2.5 1.11875 2.5 2.5C2.5 3.88125 3.61875 5 5 5C6.38125 5 7.5 3.88125 7.5 2.5C7.5 1.11875 6.38125 0 5 0ZM5 6.25C3.33125 6.25 0 7.0875 0 8.75V10H10V8.75C10 7.0875 6.66875 6.25 5 6.25Z"
                  fill="#2563eb"
                />  
              </svg>
              <p className="text-xs text-gray-900 text-center flex-1">
                {assignedto ?? null}
              </p>
            </div>
          </div>
          {/* By User */}
          <div className="flex items-center justify-center ml-4">
            <div className="w-[150px] h-7 bg-gray-100 rounded-[10px] flex items-center px-2 border border-gray-200">
              <svg
                className="mr-1 ml-2"
                width="16"
                height="16"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 4.66667L10.01 8.77333C9.75684 9.12 9.33947 9.33333 8.89474 9.33333H6.84211V8H8.89474L11.3237 4.66667L8.89474 1.33333H2.05263V3.33333H0.684211V1.33333C0.684211 0.6 1.3 0 2.05263 0H8.89474C9.33947 0 9.75684 0.206667 10.01 0.56L13 4.66667ZM5.47368 6.66667H3.42105V4.66667H2.05263V6.66667H0V8H2.05263V10H3.42105V8H5.47368V6.66667Z"
                  fill="#2563eb"
                />
              </svg>
              <p className="text-xs text-gray-900 text-center flex-1">
                {createdby ?? null}
              </p>
            </div>
            <div
              className={
                `w-[150px] h-7 rounded-[10px] flex items-center px-2 border border-gray-200 ` +
                (status === "pending"
                  ? "bg-orange-300"
                  : status === "completed"
                  ? "bg-green-300"
                  : status === "in_progress"
                  ? "bg-blue-300"
                  : "bg-gray-100")
              }
            >
              <svg
                className="mr-1 ml-2"
                width="16"
                height="16"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 4.66667L10.01 8.77333C9.75684 9.12 9.33947 9.33333 8.89474 9.33333H6.84211V8H8.89474L11.3237 4.66667L8.89474 1.33333H2.05263V3.33333H0.684211V1.33333C0.684211 0.6 1.3 0 2.05263 0H8.89474C9.33947 0 9.75684 0.206667 10.01 0.56L13 4.66667ZM5.47368 6.66667H3.42105V4.66667H2.05263V6.66667H0V8H2.05263V10H3.42105V8H5.47368V6.66667Z"
                  fill="#2563eb"
                />
              </svg>
              <p className="text-xs text-gray-900 text-center flex-1">
                {status ?? null}
              </p>
            </div>
          </div>
          <svg
            className="ml-6 mr-2"
            width="6"
            height="20"
            viewBox="0 0 6 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66667 5.33333C4.13333 5.33333 5.33333 4.13333 5.33333 2.66667C5.33333 1.2 4.13333 0 2.66667 0C1.2 0 0 1.2 0 2.66667C0 4.13333 1.2 5.33333 2.66667 5.33333ZM2.66667 8C1.2 8 0 9.2 0 10.6667C0 12.1333 1.2 13.3333 2.66667 13.3333C4.13333 13.3333 5.33333 12.1333 5.33333 10.6667C5.33333 9.2 4.13333 8 2.66667 8ZM2.66667 16C1.2 16 0 17.2 0 18.6667C0 20.1333 1.2 21.3333 2.66667 21.3333C4.13333 21.3333 5.33333 20.1333 5.33333 18.6667C5.33333 17.2 4.13333 16 2.66667 16Z"
              fill="#2563eb"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
