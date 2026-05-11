"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
	const [value, setValue] = useState<T>(() => {
		try {
			const stored = localStorage.getItem(key);
			return stored !== null ? (JSON.parse(stored) as T) : initial;
		} catch {
			return initial;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {
			// ignore storage errors (e.g. private browsing quota)
		}
	}, [key, value]);

	return [value, setValue] as const;
}
