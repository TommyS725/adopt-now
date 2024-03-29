'use client'

import { Provider } from "@/type/dbInterfaces"

import { Fragment,FC,Dispatch,SetStateAction} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"



type ProvFilterProps={
    selected:Provider[],
    className?: String
    setter: Dispatch<SetStateAction<Provider[]>>
    providers:Provider[]
}

export const ProvFilter:FC<ProvFilterProps>= ({selected,className="",setter,providers}) =>{
  return (
    <Listbox value={selected} onChange={setter} multiple>
      <div className={cn("relative mt-1",className)}>
        <Listbox.Button className=" dark:hover:bg-slate-900 hover:bg-slate-100  relative w-full cursor-default rounded-lg border py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-950 focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:text-sm">
          {selected.length?
            <span className="block truncate">{selected.map((entry) => entry.provider_name).join(', ')}</span>:
            <span className="block truncate text-zinc-500">Select a provider</span>
          }
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {providers.map((entry, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 dark:bg-blue-950 dark:bg-opacity-50  text-amber-900 dark:text-blue-300 ' : 'text-gray-900 dark:text-gray-400'
                  }`
                }
                value={entry}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {entry.provider_name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-sky-500">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

