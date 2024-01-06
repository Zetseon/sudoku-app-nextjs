'use client'
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeSwitch = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted,setMounted] = useState(false)

	useEffect(()=>setMounted(true),[])

	if(!mounted){
		return null
	}

	return (
		<div>
			<button onClick={() => setTheme(resolvedTheme==='light'? 'dark' : 'light')}>{resolvedTheme==='light'? <DarkModeOutlined/> : <LightModeOutlined/>}</button>
		</div>
	);
};

export default ThemeSwitch;

