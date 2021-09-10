import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import _toast, { toast, Toaster } from 'react-hot-toast'

import getFormattedDiffs from '../lib/dateManipulation'
import timeSync from '../lib/timeSync'

import EventName from '@components/EventName'
import Head from '@components/Head'
import Menu from '@components/Menu'
import Footer from '@components/Footer'

// Datepicker
import 'react-datepicker/dist/react-datepicker.css'

// Day.js customizations
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
dayjs.extend(relativeTime)

export default function Home(): JSX.Element {
	const { t, i18n } = useTranslation()

	const [date, setDate] = useState<Date>(new Date('Dec 24 2021'))
	const [eventName, setName] = useState<string>(`${t('Christmas')} 2021`)

	const parsed = dayjs(date)
	const [today, setToday] = useState(dayjs())
	const [offset, setOffset] = useState(0);

	const { query }: any = useRouter()

	// Sync the date
	useEffect(() => {
		const sync = async () => {
			const diff = await timeSync();
			if (Math.abs(diff) > 1000) {
				toast.success(`${diff > 0 ? "Added" : "Removed"} ${Math.abs(diff / 1000).toFixed(1)}s ${diff > 0 ? "to" : "from"} the time`);
				setOffset(diff);
			}
		}
		sync()
	}, []);

	useEffect(() => {
		if (parsed.isAfter(today)) {
			const countDown = setInterval(() => {
				setToday(dayjs())
			}, 250)

			return () => {
				clearInterval(countDown)
			}
		}
	}, [parsed, today])

	useEffect(() => {
		if (query.name && query.date) {
			setName(decodeURIComponent(query.name))
			setDate(new Date(parseInt(query.date) * 1000))
		}
	}, [query])

	const addQueryParam = (key: string, value: string) => {
		const url = new URL(window.location.href)
		url.searchParams.set(key, value)
		window.history.pushState({}, '', url.toString())
	}

	useEffect(() => {
		addQueryParam('date', (date.getTime() / 1000).toString())
		addQueryParam('name', encodeURIComponent(eventName))
	}, [date, eventName])

	const diffParams = getFormattedDiffs(today.add(offset, "ms"), parsed)

	return (
		<>
			<div className="flex flex-col items-center justify-between min-h-screen">
				<Menu />
				<Head />

				<motion.main className="text-center shadow-custom p-6 rounded-2xl bg-white dark:bg-[#262A2B] text-black dark:text-white"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1}}
				>
					<Toaster />
					<EventName
						eventName={eventName}
						setName={setName}
						date={date}
						setDate={setDate}
					/>
					<div>
						{parsed.isAfter(today) ? (
							<div
								id="countdown-area"
								className="mt-5 text-4xl   text-black dark:text-white"
							>
								{diffParams}
							</div>
						) : (
							<div className="mt-5 text-4xl   text-black dark:text-white">
								This countdown has passed {today.add(offset, "ms").to(parsed)}
							</div>
						)}
					</div>
				</motion.main>

				<Footer />
			</div>
		</>
	)
}
