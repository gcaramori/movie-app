import { Fragment, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiError } from 'react-icons/bi';

const ErrorModal = ({ isOpen, setIsOpen, errorMessage, title }) => {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 font-main" initialFocus={cancelButtonRef} onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center base:items-center base:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 base:translate-y-0 base:scale-95"
              enterTo="opacity-100 translate-y-0 base:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 base:scale-100"
              leaveTo="opacity-0 translate-y-4 base:translate-y-0 base:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-darkGray text-left shadow-xl transition-all base:my-8 base:w-full base:max-w-[95%] md:max-w-lg">
                <div className="bg-darkGray px-4 pt-5 pb-4 base:p-6 base:pb-4">
                  <div className="base:flex base:flex-col base:items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white bg-red-500 base:mx-0 base:h-10 base:w-10 mb-3">
                      <BiError size='1.8em' />
                    </div>
                    <div className=" block text-center base:mt-0">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-200">
                          {errorMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-darkGray w-full px-4 py-3 base:flex base:justify-center base:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-red-500 bg-mainRed px-4 py-2 text-base font-semibold text-gray-200 shadow-sm hover:opacity-80 focus:outline-none base:text-sm transition-all"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Ok
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ErrorModal;