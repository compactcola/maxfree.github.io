window.addEventListener("load", function (ev) {
	const samurai = document.querySelector(".samurai");
	let classes = null;
	let keys = {};

	const removeClasses = () => {
		classes.forEach((classe) => {
			if (classe !== "samurai") {
				samurai.classList.remove(classe);
			}
		});
	};

	const setIdle = () => {
		removeClasses();
		samurai.classList.add("idle");
	};

	window.addEventListener("keydown", function (ev) {
		classes = Array.from(samurai.classList);
		console.log("keydown");

		removeClasses();

		keys[ev.key] = true;

		switch (ev.key) {
			case "d":
				samurai.style.transform = "scaleX(4) scaleY(4)";
				samurai.classList.add("run");
				break;
			case "a":
				samurai.style.transform = "scaleX(-4) scaleY(4)";
				samurai.classList.add("run");
				break;
			case "k":
				samurai.classList.add("attack");
		}
	});

	window.addEventListener("keyup", function (ev) {
		keys[ev.key] = false;
		setIdle();
	});

	setInterval(() => {
		for (let key in keys) {
			if (!keys["a"] && !keys["d"] && !keys["k"]) {
				setIdle();
			}
		}
	}, 100);
});
