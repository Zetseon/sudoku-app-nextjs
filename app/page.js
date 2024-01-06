import Image from 'next/image'
import SudokuComponent from './components/SudokuComponent'
import ThemeSwitch from './components/theme/ThemeSwitcher'

export default function Home() {
	return (
		<main className="flex flex-col items-center h-screen bg-slate-300 dark:bg-neutral-900 ">
			<ThemeSwitch/>
			<SudokuComponent/>
		</main>
	)
}
