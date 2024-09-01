import { PluginAPI } from "tailwindcss/types/config"
import colors from "tailwindcss/colors";

function CustomScrollbarPlugin({ addUtilities }: PluginAPI) {
    const newUtilities = {
        ".scrollbar-webkit": {
            "&::-webkit-scrollbar": {
                height: "8px",
                width: "30px"
            },
            "&::-webkit-scrollbar-thumb": {
                background: colors.zinc[700],
                borderRadius: "8px",
            },
        }
    }

    addUtilities(newUtilities)
}

module.exports = CustomScrollbarPlugin;