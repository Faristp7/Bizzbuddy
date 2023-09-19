import { motion } from 'framer-motion'

export default function Meter({ strength }: { strength: string }) {
    const strengthVariants = {
        weak: { width: "33%", backgroundColor: "red" },
        medium: { width: "66%", backgroundColor: "yellow" },
        strong: { width: "100%", backgroundColor: "green" },
    }
    const strengthTooltips : {[key : string]: string} = { 
        weak: 'Weak Password',
        medium: 'Medium Password',
        strong: 'Strong Password',
      };
    return (
        <div className="password-meter">
      <motion.div
        className="password-strength-meter"
        initial={false}
        animate={strength}
        variants={strengthVariants}
        style={{
          height: '5px',
          borderRadius: '5px',
        }}
      ></motion.div>
      <div className="password-strength-tooltip">
        {strengthTooltips[strength]}
      </div>
    </div>
    )
}
