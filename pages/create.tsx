import dayjs from 'dayjs'
import React, { useState } from 'react'
import _toast, { toast, Toaster } from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import QRCode from 'react-qr-code'

import unidecode from 'unidecode'
import { createEvent } from 'ics'

import Head from '../components/Head'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { QRCode as QRIcon } from '../components/create/icons'
import { useTranslation } from 'react-i18next'

// Datepicker
import 'react-datepicker/dist/react-datepicker.css'

// Day.js customizations
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default function Home() {
	const { t, i18n } = useTranslation()

	const [date, setDate] = useState<Date>(new Date())

	const defaultEventName = ''
	const [eventName, setName] = useState<string>(defaultEventName)
	const [qrCodeZoom, setQrCodeZoom] = useState<boolean>(false)
	const [ticketZoom, setTicketZoom] = useState<boolean>(false)

	const reducedDate = Math.floor(date.getTime() / 1000)
	const eventURL = `https://countdowner.now.sh/?date=${reducedDate}&name=${eventName}`

	const downloadIcal = () => {
		createEvent(
			{
				title: eventName,
				busyStatus: 'FREE',
				start: [
					date.getFullYear(),
					date.getMonth() + 1,
					date.getDate(),
					date.getHours(),
					date.getMinutes(),
				],
				duration: { minutes: 60 },
				url: `https://countdowner.now.sh/?date=${date.getTime()}&name=${eventName}`,
			},
			(error, value) => {
				if (error) {
					console.log(error)
				}
				// Create a blob of the value and save it as event.ics
				const blob = new Blob([value], { type: 'text/calendar' })
				const url = URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url

				const fileName = `${unidecode(eventName)}.ics`
					.toLowerCase()
					.replaceAll(' ', '-')

				a.download = fileName
				a.click()
			}
		)
	}

	const inputStyle =
		'w-1/2 p-3 mt-3 ml-0 font-thin transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500'

	return (
		<>
			<div className="flex flex-col items-center justify-between h-screen">
				<Menu />
				<Head />
				<main className="text-center">
					<Toaster />
					<h1 className="text-3xl">{t('Create a new countdown')}</h1>

					<label htmlFor="name">{t('Event name')}: </label>
					<input
						id="name"
						type="text"
						className={inputStyle}
						value={eventName}
						onChange={(e) => {
							setName(e.target.value)
						}}
					/>
					<br />
					<label>
						{t('Event date & time')}:
						<DatePicker
							dateFormat="dd/MM/yyyy"
							className={inputStyle}
							selected={date}
							showTimeSelect
							timeIntervals={15}
							minDate={new Date()}
							onChange={(val: Date) => {
								setDate(val)
							}}
						/>
					</label>
					{qrCodeZoom && (
						<QrModal eventURL={eventURL} setQrCodeZoom={setQrCodeZoom} />
					)}

					{defaultEventName !== eventName ? (
						<div id="output" className="flex flex-col items-center mt-4 w-full">
							<div
								onClick={() => {
									setTicketZoom(true)
								}}
								className="p-4 rounded-2xl mb-8 flex text-black dark:text-white bg-white dark:bg-[#262A2B] shadow-custom"
							>
								<div className="mr-6">
									<h2 className="text-4xl mb-2">{eventName}</h2>
									<h3 className="text-2xl text-gray-400">
										{dayjs(date).format('dddd, D MMMM YYYY (HH:mm)')}
									</h3>
								</div>
								<QRIcon
									onClick={() => {
										setQrCodeZoom(true)
									}}
								/>
							</div>
							<div id="actions" className="flex gap-5">
								<Button
									onClick={async () => {
										// Copy the URL to clipboard
										if (!navigator.clipboard) {
											// Clipboard API not available
											return
										}
										try {
											await navigator.clipboard.writeText(eventURL)
											toast.success('Copied to clipboard')
										} catch (err: any) {
											toast.error('Failed to copy!', err)
										}
									}}
								>
									<>{t('Copy link')}</>
								</Button>
								<Button
									onClick={() => {
										toast.success('Event created!')
										downloadIcal()
									}}
								>
									<> {t('Download')} .ics</>
								</Button>
							</div>
						</div>
					) : (
						<span> {t('Please fill in the name and date of your event')} </span>
					)}
				</main>

				<Footer />
			</div>
		</>
	)
}

const QrModal = (props: {
	eventURL: string
	setQrCodeZoom: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const { eventURL, setQrCodeZoom } = props
	return (
		<div
			className="absolute top-0 left-0 w-screen h-screen z-200 backdrop-filter backdrop-blur-sm flex items-center"
			onClick={() => {
				setQrCodeZoom(false)
			}}
		>
			<div className="m-auto bg-white p-4 rounded-2xl shadow-custom">
				<QRCode value={eventURL} size={480} level="M" />
			</div>
		</div>
	)
}
