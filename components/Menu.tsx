import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Menu } from '@headlessui/react'
import React from 'react'
import { FaLanguage } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'

const Navbar = (): JSX.Element => {
	const { t, i18n } = useTranslation()

	return (
		<>
			{/* PC navbar */}
			<div className="hidden sm:block w-full text-xm bg-[#262A2B] text-white cursor-pointer h-14">
				<Link href="/" passHref>
					<a className="float-left p-4">{t('Home')}</a>
				</Link>
				<Link href="/create" passHref>
					<a className="float-left p-4">{t('Create countdown')}</a>
				</Link>
				<Link href="https://github.com/filiptronicek/CountDowner" passHref>
					<a
						className="float-left p-4"
						target="_blank"
						rel="noreferrer noopener"
					>
						{t('Source code')}
					</a>
				</Link>

				<Menu>
					<Menu.Button className="float-right p-2 mr-2" as="a">
						<FaLanguage size={38} />
					</Menu.Button>
					<Menu.Items className="shadow-custom absolute bg-white text-blue-500 rounded-xl p-4 right-16 top-4 flex flex-col">
						{Object.keys(i18n.services.resourceStore.data).map((language) => {
							return (
								<Menu.Item
									as="div"
									className="py-1.5 hover:text-green-400 cursor-pointer"
									key={language}
									onClick={() => {
										i18n.changeLanguage(language)
									}}
								>
									{language}
								</Menu.Item>
							)
						})}
					</Menu.Items>
				</Menu>
			</div>
			{/* Phone navbar */}
			<Menu
				as="div"
				className="sm:hidden block w-full text-xm text-right bg-[#262A2B] text-white cursor-pointer min-h-14"
			>
				<Menu.Button as="div" className="p-2 pr-4">
					<AiOutlineMenu size={26} />
				</Menu.Button>
				<Menu.Items
					className="
          border-t-[1px] border-gray-700 pt-2 bg-[#262A2B] text-white flex flex-col gap-4 text-left pl-4 pb-4 w-full"
					as="div"
				>
					<Link href="/" passHref>
						<a className="hover:text-green-400 cursor-pointer">{t('Home')}</a>
					</Link>
					<Link href="/create" passHref>
						<a className="hover:text-green-400 cursor-pointer">
							{t('Create countdown')}
						</a>
					</Link>
					<Link href="https://github.com/filiptronicek/CountDowner" passHref>
						<a
							className="hover:text-green-400 cursor-pointer"
							target="_blank"
							rel="noreferrer noopener"
						>
							{t('Source code')}
						</a>
					</Link>
					<a>Languages:</a>
					{Object.keys(i18n.services.resourceStore.data).map((language) => {
						return (
							<a
								className="hover:text-green-400 cursor-pointer pl-4"
								key={language}
								onClick={() => {
									i18n.changeLanguage(language)
								}}
							>
								{language}
							</a>
						)
					})}
				</Menu.Items>
			</Menu>
		</>
	)
}

export default Navbar
