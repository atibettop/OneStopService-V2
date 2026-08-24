(() => {
  const html = document.documentElement;
  const requestedLang = new URLSearchParams(location.search).get("lang");
  const currentLang = requestedLang === "en" ? "en" : "th";
  html.lang = currentLang;
  const translations = new Map([
    ["ข้ามไปเนื้อหาหลัก", "Skip to main content"],
    ["เมืองศรีสุข กรุ๊ป", "MUANG SRISUK GROUP"],
    ["MUANG SRISUK GROUP · BUSINESS • PEOPLE • GROWTH", "BUSINESS • PEOPLE • GROWTH"],
    ["© บริษัท เมืองศรีสุข กรุ๊ป จำกัด — สร้างคน สร้างธุรกิจ สร้างความมั่งคั่ง", "© Muang Srisuk Group Co., Ltd. — Grow People. Grow Business."],
    ["© บริษัท เมืองศรีสุข กรุ๊ป จำกัด — ราคาที่แสดงเป็นการประเมินเบื้องต้น โปรดติดต่อทีมงานเพื่อรับใบเสนอราคาอย่างเป็นทางการ", "© Muang Srisuk Group Co., Ltd. — Prices shown are indicative; contact us for a formal quotation."],
    ["บริษัท เมืองศรีสุข กรุ๊ป จำกัด", "Muang Srisuk Group Co., Ltd."],
    ["สรรหาบุคลากร", "Recruitment"],
    ["เลือก", "Choose"],
    ["ค่าบริการสรรหาบุคลากร", "Recruitment pricing"],
    ["ดูค่าบริการสรรหาบุคลากร →", "See recruitment pricing →"],
    ["หาคนที่ใช่", "Find the right people"],
    ["ให้ทีมที่ใช่", "build the right team"],
    ["บริการสรรหาและคัดเลือกบุคลากร ช่วยลดเวลาสรรหา ลดภาระงานของ HR และเข้าถึงผู้สมัครที่มีคุณสมบัติตรงกับความต้องการขององค์กร", "Recruitment and selection services that cut hiring time, lighten the load on HR, and reach candidates who match what your organization needs."],
    ["ดูแพ็กเกจรายเดือน", "See monthly packages"],
    ["ดูแบบจ่ายเมื่อได้คน", "See pay-on-hire"],
    ["จ่ายเมื่อผู้สมัครเริ่มงาน", "Pay when the candidate starts"],
    ["เหมาะสำหรับบริษัทที่เปิดรับสมัครเป็นครั้งคราว ไม่มีค่าใช้จ่ายล่วงหน้า คิดค่าบริการต่อเมื่อผู้สมัครเริ่มงานจริง", "For companies that hire occasionally. No upfront cost — the fee applies only once the candidate actually starts."],
    ["ค่าบริการเริ่มต้น 4,000 บาท ต่อตำแหน่ง", "Fees start at THB 4,000 per position"],
    ["โดยคิดตามระดับของตำแหน่งที่เปิดรับ", "charged according to the level of the role"],
    ["ระดับตำแหน่ง", "Position level"],
    ["ค่าบริการต่อตำแหน่ง", "Fee per position"],
    ["4,000 บาท", "THB 4,000"],
    ["6,000 บาท", "THB 6,000"],
    ["8,000 บาท", "THB 8,000"],
    ["10,000 บาท", "THB 10,000"],
    ["9,900 บาท", "THB 9,900"],
    ["12,900 บาท", "THB 12,900"],
    ["15,000 บาท", "THB 15,000"],
    ["8,910 บาท", "THB 8,910"],
    ["11,610 บาท", "THB 11,610"],
    ["13,500 บาท", "THB 13,500"],
    ["ขอบเขตงานที่ได้รับ", "What is included"],
    ["วิเคราะห์ Job Description", "Job description analysis"],
    ["ประกาศรับสมัครงาน", "Job posting"],
    ["ค้นหาผู้สมัครเชิงรุก", "Proactive candidate search"],
    ["คัดกรองใบสมัคร", "CV screening"],
    ["สัมภาษณ์เบื้องต้น", "Pre-screening interview"],
    ["จัดทำ Candidate Shortlist", "Candidate shortlist"],
    ["ประสานงานนัดสัมภาษณ์", "Interview coordination"],
    ["ติดตามผลการสัมภาษณ์", "Interview follow-up"],
    ["ประสานงานข้อเสนอและวันเริ่มงาน", "Offer and start-date coordination"],
    ["รับประกันการหาคนทดแทน 30 วัน", "30-day replacement guarantee"],
    ["หากผู้สมัครลาออกภายใน 30 วัน เราสรรหาผู้สมัครทดแทนให้ 1 ครั้ง โดยไม่มีค่าใช้จ่ายเพิ่มเติม", "If the candidate resigns within 30 days, we run one replacement search at no extra charge."],
    ["ชำระเมื่อผู้สมัครเริ่มงาน", "Payable when the candidate starts"],
    ["ไม่มีค่ามัดจำและไม่มีค่าใช้จ่ายระหว่างกระบวนการสรรหา", "No deposit and no charges during the search itself."],
    ["ทีมสรรหาบุคลากรแบบเหมารายเดือน", "A monthly recruitment team"],
    ["เหมาะสำหรับบริษัทที่เปิดรับหลายตำแหน่งอย่างต่อเนื่อง และต้องการลดต้นทุนการมีทีม Recruitment ประจำ", "For companies hiring across several roles continuously that want to avoid the cost of an in-house recruitment team."],
    ["บาท/เดือน", "THB/month"],
    ["สูงสุด 3 ตำแหน่ง · สูงสุด 20 ใบสมัคร/เดือน", "Up to 3 roles · up to 20 CVs per month"],
    ["สูงสุด 5 ตำแหน่ง · สูงสุด 30 ใบสมัคร/เดือน", "Up to 5 roles · up to 30 CVs per month"],
    ["สูงสุด 5 ตำแหน่ง · สูงสุด 40 ใบสมัคร/เดือน", "Up to 5 roles · up to 40 CVs per month"],
    ["อัปเดตสถานะการสรรหา", "Recruitment status updates"],
    ["ทุกบริการในแพ็กเกจ Starter", "Everything in Starter"],
    ["Active Sourcing เชิงรุก", "Proactive active sourcing"],
    ["สัมภาษณ์เบื้องต้นเชิงลึก", "In-depth pre-screening interviews"],
    ["รายงานสถานะการสรรหา", "Recruitment status report"],
    ["มี Recruitment Consultant ดูแล", "Dedicated recruitment consultant"],
    ["ทุกบริการในแพ็กเกจ Professional", "Everything in Professional"],
    ["Headhunting สำหรับตำแหน่งเฉพาะทาง", "Headhunting for specialist roles"],
    ["ประเมินผู้สมัคร (Candidate Assessment)", "Candidate assessment"],
    ["อัปเดตความคืบหน้าทุกสัปดาห์", "Weekly progress updates"],
    ["Recruitment Consultant ดูแลใกล้ชิด", "Close support from a recruitment consultant"],
    ["ประสานงานเงินเดือนและข้อเสนอ", "Salary and offer coordination"],
    ["เปิดรับเกินจำนวนตำแหน่งที่กำหนด", "Additional positions beyond the package"],
    ["คิดเพิ่มตำแหน่งละ 2,000–3,000 บาท ขึ้นอยู่กับระดับและความยากของตำแหน่ง", "THB 2,000–3,000 per extra position, depending on the level and difficulty of the role."],
    ["ส่วนลดลูกค้าใหม่", "New client offer"],
    ["ลูกค้าใหม่ที่เริ่มใช้บริการแบบ Recruitment Retainer รับส่วนลดค่าบริการ 10% สำหรับเดือนแรก", "New clients starting a Recruitment Retainer receive 10% off the first month."],
    ["แพ็กเกจ", "Package"],
    ["ราคาปกติ", "Standard price"],
    ["ราคาเดือนแรก", "First month"],
    ["เงื่อนไขเป็นไปตามที่บริษัทกำหนด ส่วนลดใช้ได้กับเดือนแรกของสัญญาเท่านั้น", "Terms apply. The discount covers the first month of the agreement only."],
    ["เลือกแบบไหนดี", "Which package fits"],
    ["ดูจากจำนวนตำแหน่งที่เปิดรับในแต่ละเดือน", "Choose based on how many roles you open each month."],
    ["แบบที่ 1", "OPTION 1"],
    ["แบบที่ 2", "OPTION 2"],
    ["แบบที่ 3", "OPTION 3"],
    ["เปิดรับ 1–2 ตำแหน่งเป็นครั้งคราว", "Hiring 1–2 roles occasionally"],
    ["เปิดรับ 3–5 ตำแหน่งต่อเดือน", "Hiring 3–5 roles a month"],
    ["สรรหาต่อเนื่องและต้องการทีมดูแลใกล้ชิด", "Hiring continuously with hands-on support"],
    ["จ่ายเมื่อได้คนเริ่มงาน ไม่มีค่าใช้จ่ายประจำเดือน", "pay only when someone starts, with no monthly fee."],
    ["คุ้มกว่าเมื่อคิดต่อตำแหน่ง และมีทีมดูแลต่อเนื่อง", "better value per role, with a team supporting you throughout."],
    ["หรือคุยกับเราเพื่อออกแบบขอบเขตงานเฉพาะองค์กร", "or talk to us about a scope built around your organization."],
    ["บอกตำแหน่งที่กำลังหา", "Tell us the role you need"],
    ["เดี๋ยวเราเริ่มสรรหาให้", "and we will start the search"],
    ["ส่งชื่อตำแหน่ง จำนวนที่ต้องการ และช่วงเงินเดือนที่ตั้งไว้ ทีมงานจะประเมินและเสนอแนวทางกลับให้", "Send the job title, how many people you need, and your salary range. Our team will review it and come back with an approach."],
    ["ส่งรายละเอียดให้ทีมงาน", "Send us your details"],
    ["กรอกสั้น ๆ แล้วกดส่ง ระบบจะรวบรวมข้อมูลให้พร้อมส่งถึงทีมงาน", "Fill in the short form and we will collect the details for our team."],
    ["ชื่อบริษัท", "Company name"],
    ["ชื่อผู้ติดต่อ", "Contact name"],
    ["อีเมลหรือเบอร์ติดต่อกลับ", "Email or phone"],
    ["จำนวนพนักงาน (คน)", "Number of employees"],
    ["บริการที่สนใจและรายละเอียดเพิ่มเติม", "Services you are interested in"],
    ["ส่งรายละเอียด →", "Send details →"],
    ["นโยบายความเป็นส่วนตัว", "Privacy policy"],
    ["ตรวจสอบก่อนส่งมอบทุกงวด", "Reviewed before every delivery"],
    ["ทบทวนข้อมูลนำเข้าและผลคำนวณอีกครั้งก่อนส่งมอบในแต่ละรอบการจ่ายเงินเดือน", "Input data and calculated results are checked again before each payroll cycle is delivered."],
    ["เกณฑ์เวลาที่เรายึดถือในการทำงานทุกงวด และระบุไว้ในสัญญาตามขอบเขตบริการที่องค์กรเลือก", "The turnaround times we work to every cycle, written into the contract for the scope you choose."],
    ["วันทำการ", "business day"],
    ["ตอบกลับทุกการติดต่อ", "Reply to every enquiry"],
    ["คำถามที่ส่งมาทางอีเมล โทรศัพท์ หรือ LINE ได้รับการตอบกลับภายในหนึ่งวันทำการ", "Questions sent by email, phone, or LINE are answered within one business day."],
    ["3 วันทำการ", "3 business days"],
    ["ส่งร่างรายงานเงินเดือนให้ตรวจสอบก่อนวันจ่าย", "Draft payroll report sent for review before payday"],
    ["1 วันทำการ", "1 business day"],
    ["ส่งไฟล์โอนธนาคารและสลิปก่อนวันจ่าย", "Bank transfer file and payslips delivered before payday"],
    ["2 วันทำการ", "2 business days"],
    ["นำส่ง ภ.ง.ด.1 และประกันสังคมก่อนกำหนดของหน่วยงาน", "PND.1 and social security filed ahead of the government deadline"],
    ["แก้ไขข้อผิดพลาดที่เกิดจากฝั่งเรา โดยไม่คิดค่าใช้จ่าย", "Errors on our side corrected at no charge"],
    ["5 วันทำการ", "5 business days"],
    ["รับข้อมูลเปลี่ยนแปลงก่อนวันจ่าย (cut-off)", "Cut-off for payroll changes before payday"],
    ["จำกัดสิทธิ์เข้าถึงข้อมูลเฉพาะผู้รับผิดชอบ พร้อมลงนามรักษาความลับ", "Access limited to assigned staff, backed by a signed confidentiality agreement"],
    ["✓ ระบุ SLA ทั้งหมดไว้ในสัญญา", "✓ Every SLA stated in the contract"],
    ["✓ ตรวจสอบข้อมูลก่อนส่งมอบทุกงวด", "✓ Data reviewed before every delivery"],
    ["✓ แจ้งล่วงหน้าเมื่อมีเหตุกระทบกำหนดส่ง", "✓ Advance notice if anything affects a deadline"],
    ["เพิ่มเพื่อนทาง LINE", "Add us on LINE"],
    ["สแกนเพื่อคุยกับทีมงานทาง LINE", "Scan to chat with our team on LINE"],
    ["เปิดกล้องมือถือสแกน หรือถ้าดูจากมือถืออยู่แล้ว", "Scan with your phone camera, or if you are already on mobile"],
    ["กดเพิ่มเพื่อนได้เลย", "tap to add us"],
    ["หรือค้นหาไอดี", "or search for the ID"],
    ["ในแอป LINE", "in the LINE app"],
    ["ติดต่อเรา", "Contact"],
    ["เตรียมข้อมูลและติดต่อทีมงาน", "Get ready and contact us"],
    ["ส่งข้อมูลมาให้ทีมงาน", "Send us your details"],
    ["ช่วยประเมินได้เลย", "and we will take it from there"],
    ["ส่งรายละเอียดตามรายการด้านซ้ายมาทางอีเมล หรือโทรสอบถามโดยตรงในเวลาทำการ", "Email us the details listed on the left, or call during business hours."],
    ["เกี่ยวกับเรา", "About us"],
    ["บริการ", "Services"],
    ["สรรหาและจัดหาบุคลากร", "Recruitment & Staffing"],
    ["บริหารจัดการและวางระบบ HR", "HR Management & Consulting"],
    ["บริการเสริมองค์กร · Event Management", "Corporate add-ons · Event Management"],
    ["ขั้นตอน", "Process"],
    ["รูปแบบบริการ", "Service options"],
    ["เตรียมข้อมูล", "Get ready"],
    ["คำนวณราคา", "Pricing calculator"],
    ["ดูแลงาน HR ให้ครบ", "Complete HR support"],
    ["เพื่อให้ธุรกิจเติบโต", "so your business can grow"],
    ["บริการ HR และงานสนับสนุนธุรกิจแบบครบวงจร ตั้งแต่ Payroll จัดหาบุคลากร วีซ่าแรงงาน ไปจนถึงที่ปรึกษาองค์กร", "End-to-end HR and business support, from payroll and recruitment to work permits and HR consulting."],
    ["คำนวณราคา Payroll", "Calculate payroll pricing"],
    ["ดูบริการทั้งหมด", "Explore all services"],
    ["✓ ทีมงานเชี่ยวชาญด้าน HR", "✓ Experienced HR team"],
    ["✓ ดูแลข้อมูลตามสิทธิ์", "✓ Role-based data handling"],
    ["✓ บริการครบวงจร", "✓ Complete HR services"],
    ["พันธมิตรผู้ดูแลทุกความต้องการด้านทรัพยากรบุคคล", "Your partner for every HR requirement"],
    ["เราเป็นผู้ให้บริการด้านทรัพยากรบุคคลแบบครบวงจร (One Stop Service) ที่มุ่งมั่นช่วยให้องค์กรธุรกิจลดภาระงานบริหารจัดการระบบภายใน เพื่อมุ่งเน้นการเติบโตเชิงกลยุทธ์ได้อย่างเต็มที่", "We provide end-to-end human resources services that reduce administrative workload, allowing your team to focus on strategic business growth."],
    ["ลดภาระงานบริหาร", "Reduce administration"],
    ["จัดการเรื่องสิทธิ กฎหมาย และงานธุรการทั้งหมดแทนทีมงานภายในขององค์กร", "Let our team handle employee benefits, compliance, and HR administration."],
    ["เพิ่มประสิทธิภาพ", "Improve efficiency"],
    ["ดึงเทคโนโลยีและผู้เชี่ยวชาญมาเพิ่มความเร็วและความถูกต้องของงาน HR", "Combine technology and specialist expertise to improve speed and accuracy."],
    ["ดำเนินงานถูกต้องตามกฎหมาย", "Stay compliant"],
    ["ช่วยลดความเสี่ยงด้านข้อบังคับแรงงานด้วยกระบวนการตรวจสอบที่เป็นระบบ", "Reduce employment-law and regulatory risks through structured review processes."],
    ["วิสัยทัศน์และค่านิยม", "Vision and values"],
    ["ทิศทางและหลักการที่เรายึดถือในการส่งมอบบริการทุกงาน", "The principles that guide every service we deliver."],
    ["VISION — วิสัยทัศน์", "VISION"],
    ["เป็นผู้นำด้านการให้บริการทรัพยากรบุคคลครบวงจรอันดับหนึ่งในประเทศไทย ที่องค์กรระดับสากลไว้วางใจสูงสุด เพื่อขับเคลื่อนธุรกิจให้เติบโตอย่างมั่นคง", "To become Thailand's trusted leader in integrated HR services, helping organizations grow with confidence."],
    ["MISSION — พันธกิจ", "MISSION"],
    ["ส่งมอบการบริการด้าน HR ที่ถูกต้อง รวดเร็ว ปลอดภัย และสอดคล้องกับข้อกฎหมายแรงงาน เพื่อยกระดับความสุขและประสิทธิภาพของพนักงานในทุกองค์กร", "To deliver accurate, responsive, secure, and compliant HR services that improve employee experience and organizational performance."],
    ["CORE VALUES — ค่านิยม", "CORE VALUES"],
    ["ความโปร่งใสเป็นเลิศ (Integrity) ความเชี่ยวชาญระดับมืออาชีพ (Professionalism) และการขับเคลื่อนด้วยเทคโนโลยีที่ทันสมัย (Innovation)", "Integrity, professionalism, and innovation shape the way we work with every client."],
    ["ความท้าทายของธุรกิจ", "Business challenges"],
    ["อุปสรรคสำคัญที่ทำให้หลายธุรกิจไม่สามารถเติบโตได้อย่างเต็มที่ เนื่องจากต้องพะวงกับงานหลังบ้านด้านทรัพยากรบุคคล", "Common back-office HR challenges that keep growing businesses from focusing on their core goals."],
    ["Payroll ซับซ้อน", "Complex payroll"],
    ["ข้อผิดพลาดด้านภาษี ประกันสังคม OT และสิทธิประโยชน์ที่ทำให้เกิดปัญหาภายใน", "Errors involving tax, social security, overtime, and employee benefits can create costly internal issues."],
    ["หาแรงงานยาก", "Recruitment gaps"],
    ["การขาดแคลนกำลังคนหรือคัดเลือกคนไม่ตรงความต้องการ ส่งผลต่อการดำเนินงานหลัก", "Talent shortages and poor role fit can disrupt day-to-day operations."],
    ["ข้อกฎหมายเปลี่ยนบ่อย", "Changing regulations"],
    ["พระราชบัญญัติคุ้มครองแรงงานและเงื่อนไขวีซ่าแรงงานต่างด้าวที่มีความเข้มงวดและปรับปรุงตลอดเวลา", "Employment regulations and foreign-worker requirements are complex and continue to evolve."],
    ["บริการแบบครบวงจร", "End-to-end HR services"],
    ["แบ่งเป็นสองสายงาน — สายสรรหาและจัดหาบุคลากร กับสายบริหารจัดการและวางระบบ HR เลือกใช้สายเดียวหรือทั้งสองสายร่วมกันก็ได้", "Two families of work: finding and onboarding people, and running the people you already have. Use one, or both together."],
    ["ดูบริการเสริมองค์กร →", "See corporate add-on services →"],
    ["บริการเสริมองค์กร", "Corporate add-on services"],
    ["บริการที่สั่งแยกได้ ไม่ต้องใช้บริการ HR อื่นของเราก่อน", "Available on their own — no other service of ours is required first."],
    ["สอบถามรายละเอียดงานอีเวนต์ →", "Ask about corporate events →"],
    ["สรรหา จัดหา และดูแลบุคลากรให้ถูกต้องตามกฎหมาย", "Sourcing, hiring, and keeping your workforce fully compliant."],
    ["บริหารจัดการและวางระบบทรัพยากรบุคคล", "Running your people operations and building the HR systems behind them."],
    ["คำนวณเงินเดือน ภาษี ประกันสังคม และจัดทำสลิปอย่างถูกต้องตรงเวลา", "Accurate, on-time payroll, tax, social security, and payslip processing."],
    ["สรรหาและคัดกรองบุคลากรที่เหมาะสม ตั้งแต่ระดับปฏิบัติการถึงผู้บริหาร", "Recruit and screen suitable candidates, from operational roles to executives."],
    ["ออกแบบและดูแลงานสัมมนา กิจกรรมทีม และงานเลี้ยงองค์กรครบวงจร", "Plan and manage corporate seminars, team activities, and company events."],
    ["บริหารเอกสาร วีซ่า และใบอนุญาตทำงานสำหรับชาวต่างชาติครบขั้นตอน", "Manage visas, work permits, and related documentation for foreign employees."],
    ["นำเข้าและดูแลแรงงานต่างด้าว 3 สัญชาติอย่างถูกต้องตามกฎหมาย", "Legally recruit and support migrant workers from Myanmar, Laos, and Cambodia."],
    ["วางโครงสร้างองค์กร เงินเดือน KPI และระบบ HR ให้พร้อมต่อการเติบโต", "Build HR strategy, organization structure, salary frameworks, and KPIs for growth."],
    ["เงินเดือน ภาษี ประกันสังคม และรายงานประจำเดือน", "Payroll, tax, social security, and monthly reports"],
    ["ดูรายละเอียด", "View details"],
    ["ระบบบริหารจัดการจ่ายเงินเดือนอย่างมืออาชีพ ป้องกันความผิดพลาด รักษาความลับข้อมูลขั้นสูงสุด", "Professional payroll management designed for accuracy, consistency, and confidentiality."],
    ["ลดต้นทุนซอฟต์แวร์", "Lower software costs"],
    ["รักษาข้อมูลเป็นความลับ", "Confidential data handling"],
    ["ถูกต้องและตรงต่อเวลา", "Accurate and on time"],
    ["ตรวจสอบความถูกต้องเป็นระบบ", "Structured accuracy checks"],
    ["ดำเนินการและตรวจทานข้อมูลซ้ำเพื่อป้องกันข้อผิดพลาดทางด้านกฎหมายภาษีและสวัสดิการ", "Payroll data is reviewed before delivery to reduce tax, compliance, and benefits errors."],
    ["สรรหา คัดกรอง และประสานงานสัมภาษณ์", "Recruitment, screening, and interview coordination"],
    ["จัดหาพนักงานที่ “ใช่” ในเวลาที่ทันท่วงที ครอบคลุมทุกความต้องการตั้งแต่อุดหนุนฝ่ายปฏิบัติการจนถึงผู้บริหารระดับสูง", "Find the right people at the right time, from operational support to senior leadership roles."],
    ["ลดเวลาจัดหาคน", "Shorter hiring cycle"],
    ["คัดกรองตามเกณฑ์ตำแหน่ง", "Screening based on role criteria"],
    ["ประสานงานสัมภาษณ์ครบขั้นตอน", "End-to-end interview coordination"],
    ["ช่วยลดระยะเวลาในกระบวนการจ้างงาน", "A more efficient hiring process"],
    ["กระบวนการคัดกรองเบื้องต้นทำให้บริษัทได้รับแคนดิเดตที่พร้อมสัมภาษณ์ทันที", "Structured screening helps your team meet interview-ready candidates sooner."],
    ["กิจกรรมองค์กร สัมมนา และงานเลี้ยงประจำปี", "Corporate activities, seminars, and annual events"],
    ["การจัดงานกิจกรรมองค์กรครบวงจร — สร้างวัฒนธรรมที่แข็งแกร่งด้วยการจัดกิจกรรมทีมบิวดิ้ง งานสัมมนา หรือเลี้ยงสังสรรค์ประจำปีโดยมืออาชีพที่พร้อมคิดคอนเซปต์และดูแลทุกรายละเอียด", "End-to-end corporate event management for team building, seminars, and annual celebrations, including concept development and on-site coordination."],
    ["บริการที่ครอบคลุม", "Services covered"],
    ["จุดเด่น", "Highlights"],
    ["ดีไซน์กิจกรรมตอบโจทย์กลุ่มเป้าหมาย", "Activity concepts tailored to your audience"],
    ["อุปกรณ์พร้อมไฟแสงสีเสียงครบครัน", "Complete event production and equipment support"],
    ["นำเข้าและดูแลแรงงานต่างด้าวอย่างถูกกฎหมาย", "Compliant migrant-worker recruitment and support"],
    ["การบริหารจัดการนำเข้าและจัดหาแรงงานต่างด้าวอย่างถูกกฎหมาย — เราเป็นตัวแทนบริการจัดเตรียมเอกสาร ประสานงาน และนำเข้าแรงงานต่างด้าว 3 สัญชาติ (เมียนมา, ลาว, กัมพูชา) อย่างมีจริยธรรม ถูกต้องตามมาตรฐานของกระทรวงแรงงาน", "We coordinate documentation and the compliant recruitment of workers from Myanmar, Laos, and Cambodia in line with Ministry of Labour requirements."],
    ["นำเข้าและรายงานตัวครบวงจร", "End-to-end onboarding and reporting"],
    ["จัดการเอกสาร MOU ข้ามแดนอย่างราบรื่น ย้ายนายจ้าง และประสานงานส่งคนถึงโรงงาน", "Coordinate cross-border MOU documentation, employer transfers, and worker arrival at the workplace."],
    ["รายงานที่พักอาศัย การตรวจสุขภาพประจำปี และประสานงานเรื่องใบอนุญาตหมดอายุล่วงหน้า", "Support accommodation reporting, annual health checks, and proactive permit-renewal coordination."],
    ["ดำเนินการเป็นขั้นตอนและตรวจสอบได้", "A structured and reviewable process"],
    ["ช่วยลดความเสี่ยงด้านกฎหมายแรงงานและการดำเนินการกับหน่วยงานภาครัฐ", "Reduce employment-law and government-process risks."],
    ["วีซ่า ใบอนุญาตทำงาน และรายงานตัว 90 วัน", "Visas, work permits, and 90-day reporting"],
    ["อำนวยความสะดวกบุคลากรระดับผู้บริหารและพนักงานต่างชาติ — เราช่วยลดความยุ่งยากของงานวีซ่าและเวิร์คเพอร์มิต มอบประสบการณ์การย้ายถิ่นฐานทำงานในไทยอย่างไร้กังวลให้กับกลุ่มนักลงทุนและผู้เชี่ยวชาญต่างชาติ", "Visa and work-permit support for executives, investors, and foreign professionals relocating to work in Thailand."],
    ["ยื่นเอกสารอนุมัติจ้างงานชาวต่างชาติตามมาตรฐานบีโอไอ (BOI) และวีซ่าทำงานทุกประเภท", "Prepare foreign-employment applications under BOI requirements and other work-visa categories."],
    ["แจ้งรายงานตัว 90 วันและดำเนินต่ออายุใบอนุญาตทำงานแบบไร้รอยต่อโดยเจ้าหน้าที่ดูแลส่วนตัว", "Coordinate 90-day reporting and work-permit renewals through a dedicated contact."],
    ["ติดต่อประสานงานสำนักงานตรวจคนเข้าเมืองอย่างใกล้ชิด", "Close coordination with immigration authorities"],
    ["เจ้าหน้าที่ส่งเอกสารและรับ-ส่งเอกสารด่วนตรงถึงบริษัท", "Document collection and delivery support"],
    ["กลยุทธ์ โครงสร้างองค์กร เงินเดือน และ KPI", "HR strategy, organization design, salary structures, and KPIs"],
    ["วางรากฐานและพัฒนาระบบบริหารจัดการทรัพยากรมนุษย์เพื่อทรานส์ฟอร์มธุรกิจให้พร้อมรับมือการเติบโตและการแข่งขัน", "Build and improve HR systems that help your organization scale and compete effectively."],
    ["ขับเคลื่อนด้วยข้อมูลวิเคราะห์จริง", "Decisions supported by practical analysis"],
    ["ปรับปรุงความสอดคล้องตามกฎหมายแรงงาน พร้อมส่งมอบคุณค่าการเป็นองค์กรต้นแบบที่น่าทำงานด้วย", "Improve employment-law alignment while building a stronger employee experience."],
    ["ขั้นตอนการให้บริการ", "How our service works"],
    ["7 ขั้นตอนมาตรฐานตั้งแต่ติดต่อครั้งแรกจนถึงการดูแลต่อเนื่องรายเดือน", "Seven clear steps from the first conversation to ongoing monthly support."],
    ["รับความต้องการ", "Discovery"],
    ["แจ้งโจทย์และข้อมูลเบื้องต้น", "Share your goals and initial information"],
    ["วิเคราะห์และให้คำปรึกษา", "Consultation"],
    ["ทำความเข้าใจกระบวนการปัจจุบัน", "Review your current process"],
    ["นำเสนอแผนบริการ", "Service proposal"],
    ["สรุปขอบเขต ระยะเวลา และราคา", "Confirm scope, timeline, and pricing"],
    ["ยืนยันข้อตกลง", "Agreement"],
    ["ตรวจสอบเงื่อนไขและลงนาม", "Review terms and sign the agreement"],
    ["เตรียมระบบ", "Setup"],
    ["รับข้อมูลและตั้งค่าการทำงาน", "Collect data and configure the workflow"],
    ["เริ่มให้บริการ", "Go live"],
    ["ทดสอบและเปิดใช้งานจริง", "Validate and launch the service"],
    ["ดูแลต่อเนื่อง", "Ongoing support"],
    ["ติดตามผลและช่วยเหลือทุกเดือน", "Monthly follow-up and assistance"],
    ["เส้นทางความร่วมมือ", "Customer journey"],
    ["มุมมองฝั่งลูกค้า ตั้งแต่ติดต่อครั้งแรกจนระบบเริ่มทำงานเต็มรูปแบบ", "What clients can expect from the first contact through full service launch."],
    ["รับรายละเอียดผ่านช่องทางด่วน", "Share initial requirements"],
    ["ประชุมประเมินระบบที่ใช้อยู่จริง", "Review the current operating process"],
    ["ปรับแผนที่เหมาะสมตามงบประมาณ", "Tailor the plan to priorities and budget"],
    ["ความสอดคล้องความร่วมมือทางกฎหมาย", "Confirm commercial and legal terms"],
    ["ถ่ายโอนฐานข้อมูลขององค์กรตั้งเดิม", "Transfer and prepare existing data"],
    ["พร้อมบริการและช่วยประหยัดเวลาเต็มพิกัด", "Launch with ongoing support"],
    ["ทำไมต้องเลือกเรา", "Why choose us"],
    ["แนวทางการทำงานที่ช่วยให้องค์กรบริหารงานทรัพยากรบุคคลได้อย่างมั่นใจมากขึ้น", "Working practices that help organizations manage HR with greater confidence."],
    ["ทีมที่ปรึกษามีประสบการณ์ดูแลงาน HR สำหรับองค์กรหลากหลายรูปแบบและขนาดธุรกิจ", "HR consultants experienced in supporting organizations across different structures and sizes."],
    ["กำหนดสิทธิ์เข้าถึงข้อมูลตามหน้าที่ และตกลงช่องทางรับส่งข้อมูลก่อนเริ่มบริการ", "Access is assigned by role, with data-transfer methods agreed before service begins."],
    ["มีผู้ประสานงานหลักสำหรับติดตามงานและสื่อสารสถานะตามขอบเขตที่ตกลงร่วมกัน", "A primary coordinator tracks work and communicates status within the agreed scope."],
    ["การดำเนินการทุกขั้นตอนตรวจสอบซ้ำกับข้อบังคับแรงงานฉบับปัจจุบันอย่างสม่ำเสมอ", "Processes are reviewed against current employment requirements on an ongoing basis."],
    ["เอกสารรายงานที่ส่งมอบ", "Service deliverables"],
    ["รายงานที่เป็นระบบ ตรวจสอบได้ง่ายผ่าน Dashboard", "Structured reports that are easy to review"],
    ["เราส่งมอบข้อมูลที่มีโครงสร้างสมบูรณ์ ถูกต้อง และจัดส่งไฟล์ในรูปแบบดิจิทัลที่สามารถนำไปใช้วิเคราะห์ประสิทธิภาพองค์กรต่อได้อย่างรวดเร็ว", "Receive structured digital files that are ready for operational review and management analysis."],
    ["สลิปเงินเดือนพนักงานทั้งแบบเอกสารและไฟล์ดิจิทัล", "Employee payslips in printed and digital formats"],
    ["ไฟล์นำส่งธนาคารสำหรับโอนเงินเดือนพร้อมใช้งานทันที", "Bank-ready payroll transfer files"],
    ["รายงานสรุปค่าใช้จ่ายและข้อมูลบุคคลสำหรับผู้บริหาร", "Management summaries for payroll costs and HR data"],
    ["รายงานตรงเวลาทุกรอบสิ้นเดือน", "Reports delivered for each agreed payroll cycle"],
    ["ส่งมอบตามกำหนดทุกงวด ไม่มีความดีเลย์", "Delivery schedules are confirmed during service setup."],
    ["พร้อมช่วยส่งชุดยื่นหน่วยงานราชการ", "Government submission support"],
    ["ทั้งกรมสรรพากรและสำนักงานประกันสังคม", "Support for Revenue Department and Social Security Office submissions."],
    ["เลือกบริการให้เหมาะกับองค์กร", "Choose the right service for your organization"],
    ["เริ่มจากบริการเดียว หรือให้ทีมงานช่วยออกแบบขอบเขตงานร่วมกันตามขนาดและเป้าหมายของธุรกิจ", "Start with one service or work with our team to design a solution around your size and business goals."],
    ["ประเมินราคาได้ทันที", "Instant estimate"],
    ["Payroll รายเดือน", "Monthly payroll"],
    ["เหมาะกับองค์กรที่ต้องการลดภาระการคำนวณเงินเดือน ภาษี ประกันสังคม และการจัดทำรายงานประจำงวด", "For organizations that want to reduce the workload of payroll, tax, social security, and recurring reports."],
    ["เลือกแพ็กเกจ Lite, Pro หรือ Premium", "Choose Lite, Pro, or Premium"],
    ["ดูราคาโดยประมาณตามจำนวนพนักงาน", "Estimate pricing by employee count"],
    ["เปรียบเทียบฟังก์ชันก่อนตัดสินใจ", "Compare included features"],
    ["เลือกใช้เป็นรายบริการ", "Choose individual services"],
    ["บริการ HR เฉพาะด้าน", "Specialist HR services"],
    ["เลือกเฉพาะงานในสายสรรหาและจัดหาบุคลากร เช่น สรรหาบุคลากร แรงงานต่างด้าว วีซ่าและใบอนุญาตทำงาน", "Pick individual services from the recruitment and staffing family: hiring, migrant workers, visas, and work permits."],
    ["กำหนดขอบเขตงานตามความต้องการ", "Define a scope around your needs"],
    ["มีผู้ประสานงานดูแลแต่ละโครงการ", "Work with a dedicated coordinator"],
    ["เริ่มจากบริการเดียวและขยายภายหลังได้", "Start with one service and expand later"],
    ["ดูรายละเอียดบริการ", "Explore services"],
    ["ออกแบบร่วมกับทีมที่ปรึกษา", "Designed with our consultants"],
    ["โซลูชันสำหรับองค์กร", "Organization-wide solutions"],
    ["สำหรับองค์กรที่ต้องการวางระบบ HR ใหม่ เชื่อมหลายบริการ หรือปรับกระบวนการให้รองรับการเติบโต", "For organizations that need a new HR operating model, connected services, or processes built for growth."],
    ["สำรวจกระบวนการและปัญหาปัจจุบัน", "Review current processes and challenges"],
    ["วางแผนขอบเขต ระยะเวลา และผลลัพธ์", "Plan scope, timeline, and outcomes"],
    ["จัดทำข้อเสนอให้เหมาะกับองค์กร", "Receive a tailored proposal"],
    ["เตรียมข้อมูลขอข้อเสนอ", "Prepare for a proposal"],
    ["มาตรฐานการให้บริการ (SLA)", "Service standards (SLA)"],
    ["ตรวจสอบก่อนส่งมอบ", "Review before delivery"],
    ["✓ ตรวจสอบข้อมูลก่อนส่งมอบ", "✓ Data reviewed before delivery"],
    ["คำถามที่ลูกค้าถามบ่อย", "Frequently asked questions"],
    ["ข้อมูลเบื้องต้นก่อนเริ่มพูดคุยกับทีมงาน เพื่อช่วยให้องค์กรเตรียมรายละเอียดและประเมินขอบเขตบริการได้ง่ายขึ้น", "Helpful information to prepare your requirements and assess the service scope before speaking with the team."],
    ["ดูข้อมูลที่ต้องเตรียม →", "View required information →"],
    ["ค่าบริการ Payroll คิดอย่างไร?", "How is payroll pricing calculated?"],
    ["ค่าบริการประเมินจากจำนวนพนักงานและแพ็กเกจที่เลือก โดย 30 คนแรกเป็นราคาเหมารายเดือน และจำนวนที่เกินคิดเพิ่มตามช่วงจำนวนพนักงาน สามารถทดลองคำนวณได้ทันทีในหน้าคำนวณราคา", "Pricing is estimated from your employee count and selected package. The first 30 employees use a flat monthly fee, with additional employees charged at the applicable volume tier."],
    ["ต้องเตรียมข้อมูลอะไรเพื่อเริ่มประเมินบริการ?", "What information is needed for an initial assessment?"],
    ["เตรียมจำนวนพนักงาน รอบการจ่ายเงินเดือน ระบบที่ใช้อยู่ และขอบเขตบริการที่ต้องการ ข้อมูลเหล่านี้ช่วยให้ทีมงานวางแนวทางได้ตรงกับองค์กร", "Prepare your employee count, payroll cycle, current systems, and required service scope so our team can recommend a suitable approach."],
    ["ใช้เวลาเริ่มระบบนานเท่าไร?", "How long does implementation take?"],
    ["ระยะเวลาเริ่มงานขึ้นอยู่กับความพร้อมของข้อมูล ระบบเดิม และขอบเขตบริการ ทีมงานจะแจ้งแผนดำเนินงานและวันเริ่มใช้งานหลังประเมินรายละเอียดร่วมกัน", "Timing depends on data readiness, existing systems, and service scope. We confirm the implementation plan and go-live date after the initial assessment."],
    ["ข้อมูลเงินเดือนและข้อมูลพนักงานได้รับการดูแลอย่างไร?", "How is payroll and employee data handled?"],
    ["ทีมงานกำหนดสิทธิ์เข้าถึงข้อมูลตามหน้าที่ ตรวจสอบข้อมูลก่อนส่งมอบ และตกลงช่องทางรับส่งข้อมูลที่เหมาะสมกับองค์กรก่อนเริ่มบริการ", "Access is limited by role, information is checked before delivery, and secure transfer methods are agreed with your organization before service begins."],
    ["เลือกใช้เฉพาะบางบริการได้หรือไม่?", "Can we select only certain services?"],
    ["ได้ องค์กรสามารถเริ่มจาก Payroll, Recruitment, Visa & Work Permit หรือบริการอื่นเพียงรายการเดียว และเพิ่มบริการภายหลังได้ตามความต้องการ", "Yes. You can start with Payroll, Recruitment, Visa & Work Permit, or another individual service, then add more support as your needs evolve."],
    ["ช่วยให้ทีมงานประเมินได้ตรงกับองค์กร", "Help the team assess your organization accurately"],
    ["เตรียมข้อมูลพื้นฐาน 3 ส่วน เพื่อใช้กำหนดขอบเขต ระยะเวลา และราคาที่เหมาะสม", "Prepare three sets of basic information to define a suitable scope, timeline, and price."],
    ["รอบจ่ายและระบบที่ใช้อยู่", "Payroll cycle and current system"],
    ["บริการและผลลัพธ์ที่ต้องการ", "Required services and outcomes"],
    ["ประเมินค่าบริการ Payroll ด้วยตัวเอง →", "Estimate payroll pricing →"],
    ["เริ่มประเมินราคา Payroll →", "Start payroll pricing estimate →"],
    ["ราคาที่แสดงเป็นการประเมินเบื้องต้น", "Displayed prices are preliminary estimates"],
    ["คำนวณราคา Payroll รายเดือน | เมืองศรีสุข กรุ๊ป", "Monthly Payroll Pricing Calculator | Muang Srisuk Group"],
    ["รู้ค่าบริการ Payroll", "Estimate your payroll fee"],
    ["ได้ทันทีในไม่กี่วินาที", "in just a few seconds"],
    ["กรอกจำนวนพนักงานเพียงครั้งเดียว ระบบจะคำนวณราคาและเปรียบเทียบทุกแพ็กเกจให้อัตโนมัติ", "Enter your employee count to calculate estimated monthly pricing and compare all packages."],
    ["กรอกจำนวนพนักงาน", "Enter employee count"],
    ["ระบุจำนวนปัจจุบันของบริษัท", "Use your current workforce size"],
    ["เปรียบเทียบ 3 แพ็กเกจ", "Compare 3 packages"],
    ["ดูยอดรวมและค่าเฉลี่ยต่อคน", "Review total and per-employee cost"],
    ["เลือกบริการที่เหมาะสม", "Choose the right package"],
    ["ตรวจสอบฟังก์ชันก่อนติดต่อทีมงาน", "Review included services before contacting us"],
    ["คำนวณค่าบริการรายเดือน", "Calculate monthly service fees"],
    ["จำนวนพนักงานปัจจุบัน", "Current employee count"],
    ["ระบุจำนวนพนักงาน", "Number of employees"],
    ["คน", "employees"],
    ["ช่วงอัตรา:", "Pricing tier:"],
    ["วิธีคิดค่าบริการ", "How pricing works"],
    ["30 คนแรกเป็นราคาเหมารายเดือน ส่วนจำนวนที่เกินจะคิดเพิ่มตามช่วงจำนวนพนักงานขององค์กร", "The first 30 employees use a flat monthly fee. Additional employees are charged according to your organization's volume tier."],
    ["จำนวนพนักงาน (คน)", "Employee count"],
    ["Lite (บาท)", "Lite (THB)"],
    ["Pro (บาท)", "Pro (THB)"],
    ["Premium (บาท)", "Premium (THB)"],
    ["ราคานี้ใช้สำหรับการประเมินเบื้องต้น ขอบเขตงานจริงอาจปรับตามรอบจ่าย รูปแบบข้อมูล ระบบเดิม และบริการเพิ่มเติมที่องค์กรเลือกใช้", "These prices are initial estimates. Final scope may vary based on payroll cycles, data format, existing systems, and any additional services selected."],
    ["ตารางเปรียบเทียบฟังก์ชันโดยละเอียด", "Detailed package comparison"],
    ["เปรียบเทียบความแตกต่างด้านการบริการของแต่ละแพ็กเกจอย่างละเอียด", "Compare the services included in Lite, Pro, and Premium."],
    ["บริการและโซลูชันที่ครอบคลุม", "Included services and solutions"],
    ["ต้องการภาพรวมบริการทั้งหมดขององค์กร ดูได้ที่", "Looking for other HR services? Visit our"],
    ["หน้าโปรไฟล์บริษัท", "company profile"],
    ["พร้อมรับใบเสนอราคาที่เหมาะกับองค์กร?", "Ready for a quote tailored to your organization?"],
    ["ส่งจำนวนพนักงาน รอบการจ่าย และบริการที่สนใจให้ทีมงานตรวจสอบ เพื่อยืนยันขอบเขตและราคาอย่างเป็นทางการ", "Share your employee count, payroll cycle, and required services so our team can confirm the final scope and official pricing."],
    ["ประเมินความต้องการเบื้องต้น", "Review your initial requirements"],
    ["สรุปขอบเขตและแผนเริ่มงาน", "Confirm scope and implementation plan"],
    ["จัดทำใบเสนอราคาสำหรับองค์กร", "Prepare an organization-specific quote"],
    ["ดูข้อมูลที่ต้องเตรียม", "View required information"],
    ["© บริษัท เมืองศรีสุข กรุ๊ป จำกัด — ราคาที่แสดงเป็นการประเมินเบื้องต้น โปรดติดต่อทีมงานเพื่อรับใบเสนอราคาอย่างเป็นทางการ", "© Muang Srisuk Group Co., Ltd. — Displayed prices are estimates. Contact our team for an official quotation."],
    ["กลับหน้าโปรไฟล์บริษัท", "Back to company profile"],
    ["0 - 30 คน (ราคาเหมา)", "0 - 30 employees (flat fee)"],
    ["31 - 200 คน (เพิ่มต่อคน)*", "31 - 200 employees (per additional employee)*"],
    ["201 - 500 คน (เพิ่มต่อคน)", "201 - 500 employees (per additional employee)"],
    [">= 501 คนขึ้นไป (เพิ่มต่อคน)", "501+ employees (per additional employee)"],
    ["0 - 30 คน", "0 - 30 employees"],
    ["31 - 200 คน", "31 - 200 employees"],
    ["201 - 500 คน", "201 - 500 employees"],
    [">= 501 คนขึ้นไป", "501+ employees"],
    ["คำนวณเงินเดือน & นำส่งภาษีพื้นฐาน เหมาะสำหรับธุรกิจขนาดเล็ก", "Core payroll calculation and basic tax submissions for smaller businesses."],
    ["สตาร์ทอัพ หรือธุรกิจพนักงาน 1-30 คน ที่ต้องการความถูกต้องและประหยัดงบ", "Startups and businesses with 1-30 employees seeking a cost-effective payroll service."],
    ["จัดการประวัติพนักงาน สลิปออนไลน์ และรายงานราชการสิ้นปีครบถ้วน", "Employee records, online payslips, and year-end statutory reports."],
    ["SME หรือบริษัทที่ต้องการลดงานเอกสารบุคคลและเปลี่ยนมาใช้สลิปออนไลน์", "SMEs that want to reduce HR paperwork and move to online payslips."],
    ["ดูแลเต็มรูปแบบ ครอบคลุมตรวจเวลาทำงาน สลิปเข้ารหัส และกองทุนสำรองฯ", "Full-service support including attendance review, password-protected payslips, and provident fund processing."],
    ["บริษัทขนาดกลาง-ใหญ่ ที่ต้องการเอาท์ซอร์สงานระบบบุคคลและการตอกบัตรเต็มรูปแบบ", "Mid-sized and larger organizations outsourcing payroll administration and attendance processing."],
    ["1. บริการคำนวณ เงินเดือน-ค่าแรง ค่าล่วงเวลา ตามระเบียบข้อบังคับ", "1. Salary, wages, and overtime calculations based on company rules"],
    ["2. บริการคำนวณเงินประกันสังคม กองทุนสำรองเลี้ยงชีพ และภาษีหัก ณ ที่จ่าย", "2. Social security, provident fund, and withholding-tax calculations"],
    ["3. บริการจัดทำรายงานเงินเดือนประจำงวด และรายงานสรุปค่าใช้จ่ายส่งธนาคาร", "3. Payroll-cycle reports and bank transfer summaries"],
    ["4. บริการจัดทำรายงานการหักภาษี ณ ที่จ่ายรายเดือน (ภ.ง.ด. 1)", "4. Monthly withholding-tax report (PND 1)"],
    ["5. บริการจัดทำแบบนำส่งเงินประกันสังคม (สปส.1-01)", "5. Social security submission form (SPS 1-01)"],
    ["6. บริการนำส่งภาษีและประกันสังคมรายเดือน", "6. Monthly tax and social security submissions"],
    ["7. บริการสลิปเงินเดือนสำหรับพนักงาน (Payslip)", "7. Employee payslips"],
    ["สลิปเงินเดือนทั่วไป", "Standard payslip"],
    ["8. บริการจัดทำทะเบียนประวัติพนักงาน (Employee Database)", "8. Employee database administration"],
    ["9. บริการแจ้งเข้า-ออกพนักงาน ประกันสังคม", "9. Social security employee registration and termination"],
    ["10. บริการแจ้งเข้า-ออกพนักงาน กองทุนสำรองเลี้ยงชีพ", "10. Provident fund employee registration and termination"],
    ["11. บริการออกหนังสือรับรองหักภาษี ณ ที่จ่าย (50 ทวิ) และรายงานสิ้นปี (ภ.ง.ด.1ก, ภ.ง.ด.91, กท.20ก)", "11. Withholding-tax certificates (50 Tawi) and year-end reports"],
    ["12. บริการออกหนังสือรับรองเงินเดือน และหนังสือรับรองการทำงาน", "12. Salary and employment certificates"],
    ["13. บริการรวมรวมและตรวจสอบบัตรตอกพนักงาน (Time Attendance)", "13. Time-attendance data collection and review"],
    ["14. บริการรายงานสรุปเวลาการปฏิบัติงาน (Attendance Summary Report)", "14. Attendance summary report"],
    ["ทีมสรรหาบุคลากร", "A recruitment team"],
    ["แบบเหมาจ่ายรายเดือน", "on a monthly retainer"],
    ["ลดภาระการสรรหา เพิ่มความเร็วในการได้คน และควบคุมต้นทุน Recruitment ด้วยทีม Recruitment ที่ดูแลตั้งแต่ประกาศงาน ค้นหาผู้สมัคร คัดกรอง สัมภาษณ์เบื้องต้น จัดทำ Shortlist ไปจนถึงติดตามผลการจ้างงาน", "Cut your hiring workload, fill roles faster, and keep recruitment costs predictable with a team that handles everything from job posting, sourcing, screening, and first-round interviews to shortlisting and follow-up through to start date."],
    ["เลือกแพ็กเกจที่เหมาะกับปริมาณการรับคน", "Choose the package that fits your hiring volume"],
    ["บริการ Recruitment แบบรายเดือน สำหรับบริษัทที่มีการเปิดรับสมัครอย่างต่อเนื่อง คิดค่าบริการแบบเหมาจ่าย ไม่ต้องเพิ่มต้นทุนการจ้าง Recruiter ประจำ", "A monthly recruitment service for companies hiring continuously — a flat retainer, with no need to add the cost of an in-house recruiter."],
    ["สูงสุด 2 ตำแหน่ง", "Up to 2 roles"],
    ["สูงสุด 3 ตำแหน่ง", "Up to 3 roles"],
    ["สูงสุด 5 ตำแหน่ง", "Up to 5 roles"],
    ["ที่เปิดรับพร้อมกัน", "open at the same time"],
    ["Qualified Candidates สูงสุด 15 ราย/เดือน", "Up to 15 qualified candidates / month"],
    ["Qualified Candidates สูงสุด 25 ราย/เดือน", "Up to 25 qualified candidates / month"],
    ["Qualified Candidates สูงสุด 40 ราย/เดือน", "Up to 40 qualified candidates / month"],
    ["จัดทำและเผยแพร่ประกาศรับสมัครงาน", "Job ads written and published"],
    ["CV Screening และคัดกรองผู้สมัคร", "CV screening and candidate filtering"],
    ["Screening Interview เบื้องต้น", "Initial screening interview"],
    ["ประสานงานนัดสัมภาษณ์และติดตามสถานะ", "Interview scheduling and status tracking"],
    ["สรรหาผ่านช่องทาง Organic และ Recruitment Network", "Sourcing through organic channels and our recruitment network"],
    ["เหมาะสำหรับบริษัท SME หรือบริษัทที่มีตำแหน่งเปิดเป็นครั้งคราว และต้องการลดภาระงาน Recruitment ของทีม HR", "For SMEs or companies that hire occasionally and want to lighten their HR team's recruitment load."],
    ["ทุกบริการจาก Starter", "Everything in Starter"],
    ["พร้อมเพิ่มเติม", "plus:"],
    ["Active Sourcing เชิงรุก และ Headhunting", "Proactive active sourcing and headhunting"],
    ["Deep Screening Interview และ Candidate Assessment", "Deep screening interviews and candidate assessment"],
    ["Salary Benchmark เบื้องต้น", "Basic salary benchmark"],
    ["Shortlist พร้อม Recommendation", "Shortlist with recommendations"],
    ["Weekly Recruitment Report และ Dashboard", "Weekly recruitment report and dashboard"],
    ["Offer Follow-up และประสานงาน Hiring Manager", "Offer follow-up and hiring-manager coordination"],
    ["Recruitment Consultant ดูแลบัญชี", "A recruitment consultant on your account"],
    ["Media Support Budget สูงสุด 2,000 บาท/เดือน", "Media support budget up to THB 2,000 / month"],
    ["เหมาะสำหรับบริษัทที่เปิดรับหลายตำแหน่งอย่างต่อเนื่อง และต้องการทีม Recruitment ภายนอกช่วยดูแล โดยไม่ต้องเพิ่มต้นทุน Recruiter ประจำ", "For companies hiring across several roles continuously that want an external recruitment team without the cost of an in-house recruiter."],
    ["ทุกบริการจาก Professional", "Everything in Professional"],
    ["Priority Recruitment และ Headhunting เฉพาะทาง", "Priority recruitment and specialist headhunting"],
    ["Candidate Assessment เชิงลึก", "In-depth candidate assessment"],
    ["Salary Negotiation Support และ Offer Management", "Salary-negotiation support and offer management"],
    ["Weekly Recruitment Meeting และ Hiring Pipeline Dashboard", "Weekly recruitment meeting and hiring-pipeline dashboard"],
    ["ให้คำปรึกษาด้าน Recruitment Strategy และ Planning", "Advice on recruitment strategy and planning"],
    ["Media Support Budget สูงสุด 4,000 บาท/เดือน", "Media support budget up to THB 4,000 / month"],
    ["เหมาะสำหรับบริษัทที่เปิดรับหลายตำแหน่งพร้อมกัน ต้องการทีม Recruitment ที่ดูแลใกล้ชิด และเพิ่มความเร็วในการปิดตำแหน่ง", "For companies hiring several roles at once that want a hands-on recruitment team and faster time-to-fill."],
    ["เปรียบเทียบแพ็กเกจ", "Compare packages"],
    ["ดูขอบเขตงานของแต่ละแพ็กเกจแบบเทียบกัน เพื่อเลือกให้ตรงกับปริมาณการรับคน", "See each package's scope side by side and pick the one that matches your hiring volume."],
    ["ราคา / เดือน", "Price / month"],
    ["2,000 บาท", "THB 2,000"],
    ["เพิ่มตำแหน่งนอกเหนือแพ็กเกจ", "Add roles beyond your package"],
    ["กรณีมีตำแหน่งเปิดรับเกินจำนวนที่กำหนดในแพ็กเกจ สามารถเพิ่มตำแหน่งได้ตามระดับของงาน", "If you open more roles than your package covers, extra roles can be added by seniority."],
    ["+2,500 บาท", "+THB 2,500"],
    ["+3,500 บาท", "+THB 3,500"],
    ["+5,000 บาท", "+THB 5,000"],
    ["/ ตำแหน่ง", "/ position"],
    ["ประเมินรายตำแหน่ง", "Quoted per role"],
    ["ตำแหน่งทั่วไป (General Position)", "General position"],
    ["ตำแหน่งเฉพาะทาง (Specialist / Professional)", "Specialist / professional role"],
    ["ตำแหน่งบริหารหรือหายาก (Manager / Difficult Position)", "Management or hard-to-fill role"],
    ["ผู้บริหารระดับสูงหรือ Urgent Headhunting", "Executive or urgent headhunting"],
    ["ช่องทางประกาศงานที่เราดูแลให้", "The channels we post your jobs on"],
    ["ในแต่ละแพ็กเกจ ทีม Recruitment จะเลือกช่องทางประกาศงานให้เหมาะกับตำแหน่งและกลุ่ม Candidate", "For every package, our recruitment team picks the posting channels that suit the role and its candidate pool."],
    ["แพ็กเกจ Professional รวมงบสนับสนุนสูงสุด 2,000 บาท/เดือน และ Business สูงสุด 4,000 บาท/เดือน สำหรับ Premium Job Board หรือ Paid Advertising", "Professional includes up to THB 2,000 / month and Business up to THB 4,000 / month toward premium job boards or paid advertising."],
    ["เกินวงเงินหรือใช้ช่องทางพิเศษ", "Over budget or premium channels"],
    ["หากมีค่าใช้จ่าย Premium Job Board หรือ Paid Advertising เกินวงเงิน จะเสนอให้ลูกค้าพิจารณาและอนุมัติก่อนดำเนินการทุกครั้ง", "Any premium job board or paid advertising beyond the budget is always quoted for your approval before we proceed."],
    ["ขั้นตอนการสรรหา", "The recruitment process"],
    ["ดูแลตั้งแต่รับ Requirement จนผู้สมัครเริ่มงาน โดยมีทีมประสานงานทุกขั้นตอน", "We manage everything from taking the requirement to the candidate's start date, coordinating at every step."],
    ["รับ Requirement และวิเคราะห์ Job Description", "Take the requirement and analyse the job description"],
    ["ค้นหา Candidate จากหลายช่องทาง", "Source candidates across multiple channels"],
    ["คัดกรองประสบการณ์ ทักษะ เงินเดือน และความเหมาะสม", "Screen for experience, skills, salary, and fit"],
    ["สัมภาษณ์เบื้องต้นและประเมิน Candidate", "Run first-round interviews and assess candidates"],
    ["นำเสนอ Candidate ที่ผ่านการคัดกรองพร้อมข้อมูลประกอบ", "Present screened candidates with supporting details"],
    ["ประสานงาน Candidate และ Hiring Manager", "Coordinate between candidate and hiring manager"],
    ["ช่วยประสานงาน Offer และ Salary Negotiation ตามแพ็กเกจ", "Help with offers and salary negotiation, per package"],
    ["ติดตาม Candidate จนเริ่มงาน", "Follow up with the candidate through to start date"],
    ["รับประกันการหาคนทดแทน", "Replacement guarantee"],
    ["กรณีผู้สมัครลาออกหรือไม่ผ่านทดลองงานภายใต้เงื่อนไขที่กำหนด ทีมงานดำเนินการสรรหาทดแทนให้ 1 ครั้ง โดยไม่มีค่าบริการ Recruitment เพิ่มเติม", "If a hire resigns or fails probation under the agreed terms, we run one replacement search at no extra recruitment fee."],
    ["30 วัน", "30 days"],
    ["60 วัน", "60 days"],
    ["90 วัน", "90 days"],
    ["รับประกันการหาคนทดแทนภายใน 30 วันหลังผู้สมัครเริ่มงาน", "Replacement guaranteed within 30 days of the hire's start date."],
    ["รับประกันการหาคนทดแทนภายใน 60 วันหลังผู้สมัครเริ่มงาน", "Replacement guaranteed within 60 days of the hire's start date."],
    ["รับประกันการหาคนทดแทนภายใน 90 วันหลังผู้สมัครเริ่มงาน", "Replacement guaranteed within 90 days of the hire's start date."],
    ["รายละเอียดและเงื่อนไข Replacement Guarantee เป็นไปตามข้อตกลงในสัญญาบริการ", "Replacement-guarantee details and terms follow the service agreement."],
    ["จ่ายค่าบริการเมื่อ Candidate เริ่มงาน", "Pay only when the candidate starts"],
    ["สำหรับบริษัทที่ไม่ได้ต้องการใช้บริการแบบรายเดือน เลือกใช้บริการแบบ Success Fee จ่ายเฉพาะเมื่อได้คนเริ่มงานจริง", "For companies that don't need a monthly service, the success-fee option charges only when a candidate actually starts."],
    ["คิดค่าบริการเป็นเปอร์เซ็นต์จากรายได้รวมต่อปีของ Candidate", "The fee is a percentage of the candidate's total annual income"],
    ["ตามระดับของตำแหน่งที่เปิดรับ", "based on the seniority of the role"],
    ["เหมาะสำหรับบริษัทที่มีตำแหน่งเปิดไม่บ่อย หรือต้องการใช้บริการเฉพาะบางตำแหน่ง · เปอร์เซ็นต์คำนวณจากรายได้รวมต่อปีของ Candidate", "For companies that hire infrequently or want the service for select roles only · the percentage is calculated on the candidate's total annual income."],
    ["ราคาเปิดตัวสำหรับลูกค้ากลุ่มแรก", "Launch pricing for our first clients"],
    ["สำหรับบริษัทที่เริ่มใช้บริการ Recruitment Retainer กับเรา รับราคาเปิดตัวใน 3 เดือนแรก", "Companies starting a recruitment retainer with us get launch pricing for the first three months."],
    ["ปกติ 17,900 บาท/เดือน", "Normally THB 17,900 / month"],
    ["ปกติ 24,900 บาท/เดือน", "Normally THB 24,900 / month"],
    ["· ราคาเปิดตัว 3 เดือนแรก", "· launch price for the first 3 months"],
    ["สิทธิ์ราคาเปิดตัวมีจำนวนจำกัด หลังสิ้นสุดระยะเวลาโปรโมชั่นจะกลับสู่ราคาปกติตามแพ็กเกจ", "Launch pricing is limited; after the promotional period, standard package rates apply."],
    ["ทำไมต้องเลือกเรา", "Why choose us"],
    ["เราไม่ได้มุ่งเน้นจำนวน CV แต่เน้น Candidate ที่ตรงกับ Requirement และมีโอกาสผ่านการคัดเลือก", "We don't chase CV counts — we focus on candidates who match the requirement and can actually make it through selection."],
    ["ไม่ใช่แค่ “ส่ง CV”", "More than “sending CVs”"],
    ["เน้น Candidate ที่ตรงกับ Requirement และมีโอกาสผ่านการคัดเลือกจริง ไม่ใช่แค่ปริมาณ", "We prioritise candidates who fit the requirement and can pass selection — not sheer volume."],
    ["ลดต้นทุนทีม Recruitment", "Lower recruitment-team cost"],
    ["ไม่ต้องเพิ่ม Recruiter ประจำ มีทีม Recruitment ช่วยดูแลตามปริมาณงานที่ต้องการ", "No need to add a full-time recruiter — a recruitment team supports you at the volume you need."],
    ["เข้าถึง Candidate หลายช่องทาง", "Reach candidates on many channels"],
    ["ผสมผสาน Job Board, Social Media, Direct Sourcing, Recruitment Network และ Headhunting", "A mix of job boards, social media, direct sourcing, our recruitment network, and headhunting."],
    ["มี Consultant ช่วยวิเคราะห์", "A consultant to advise you"],
    ["ช่วยปรับ Requirement, Salary Range และ Recruitment Strategy ให้เหมาะกับตลาดแรงงาน", "We help tune the requirement, salary range, and recruitment strategy to the labour market."],
    ["ดูแลตั้งแต่ต้นจนจบ", "End-to-end coverage"],
    ["ตั้งแต่ Requirement → Sourcing → Screening → Interview → Offer → Follow-up → Start Work", "From requirement → sourcing → screening → interview → offer → follow-up → start work."],
    ["Replacement Guarantee 30–90 วันตามแพ็กเกจ เพื่อสร้างความมั่นใจให้กับลูกค้า", "A 30–90 day replacement guarantee by package, for your peace of mind."],
    ["เงื่อนไขการให้บริการ", "Service terms"],
    ["สัญญาบริการขั้นต่ำ 3 เดือน", "Minimum service term of 3 months."],
    ["Active Position หมายถึงตำแหน่งที่อยู่ระหว่างกระบวนการ Recruitment", "An active position is a role currently in the recruitment process."],
    ["Qualified Candidates คือจำนวน Candidate ที่ผ่านการคัดกรองเบื้องต้นตาม Requirement", "Qualified candidates are those who pass initial screening against the requirement."],
    ["ตำแหน่งที่มีความซับซ้อนสูงหรือมี Requirement เฉพาะทาง อาจมีค่าใช้บริการเพิ่มเติม", "Highly complex or specialised roles may carry an additional fee."],
    ["ค่า Premium Job Board และค่าโฆษณาที่เกิน Media Support Budget คิดตามจริง โดยต้องได้รับการอนุมัติจากลูกค้าก่อน", "Premium job-board and advertising costs beyond the media support budget are charged at cost and require your prior approval."],
    ["บริการ Recruitment ไม่รับประกันจำนวนผู้สมัครหรือระยะเวลาการปิดตำแหน่ง เนื่องจากขึ้นอยู่กับตลาดแรงงานและ Requirement ของแต่ละตำแหน่ง", "Recruitment does not guarantee a candidate count or time-to-fill, as both depend on the labour market and each role's requirement."],
    ["รายละเอียด Replacement Guarantee และเงื่อนไขการชำระเงินเป็นไปตามสัญญาบริการ", "Replacement-guarantee details and payment terms follow the service agreement."],
    ["กำลังเปิดรับสมัครหลายตำแหน่ง?", "Hiring for several roles?"],
    ["ให้ทีม Recruitment ของเราช่วยดูแล", "Let our recruitment team handle it"],
    ["ส่งรายละเอียดตำแหน่งที่ต้องการรับสมัคร ทีมงานจะช่วยแนะนำแพ็กเกจและแนวทาง Recruitment ที่เหมาะกับธุรกิจของคุณ — นัดหมายเพื่อประเมิน Requirement ฟรี", "Send us the roles you're hiring for and our team will suggest the package and recruitment approach that fits your business — book a free requirement consultation."]
  ]);

  const normalize = value => value.replace(/\s+/g, " ").trim();

  function translateTextNode(node) {
    const value = node.nodeValue;
    const key = normalize(value);
    const translated = translations.get(key);
    if (!translated) return;
    const leading = value.match(/^\s*/)[0];
    const trailing = value.match(/\s*$/)[0];
    node.nodeValue = leading + translated + trailing;
  }

  function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);
  }

  function rewriteEnglishLinks() {
    document.querySelectorAll('a[href]:not([data-lang])').forEach(link => {
      const href = link.getAttribute("href");
      if (href === "index.html") link.setAttribute("href", "./?lang=en");
      else if (href && href.startsWith("index.html#")) link.setAttribute("href", href.replace("index.html#", "./?lang=en#"));
      else if (href === "pricing.html") link.setAttribute("href", "pricing.html?lang=en");
    });
  }

  function languageTarget(lang) {
    const page = document.body?.dataset.page;
    if (page === "pricing") return `pricing.html?lang=${lang}`;
    if (page === "recruitment") return `recruitment.html?lang=${lang}`;
    const homePath = location.pathname.replace(/index\.html$/, "");
    return `${homePath}?lang=${lang}`;
  }

  function updateEnglishMetadata() {
    const page = document.body?.dataset.page;
    const home = page === "home";
    const META = {
      home: {
        title: "Payroll Outsourcing & Complete HR Services | Muang Srisuk Group",
        description: "Muang Srisuk Group runs two families of HR work in Thailand: recruitment, migrant workers, visas and work permits; and payroll, HR consulting, and corporate events."
      },
      recruitment: {
        title: "Recruitment Pricing | Muang Srisuk Group",
        description: "Success Fee from THB 4,000 per position, payable once the candidate starts, or a monthly recruitment retainer from THB 9,900."
      },
      pricing: {
        title: "Monthly Payroll Pricing Calculator | Muang Srisuk Group",
        description: "Estimate monthly payroll outsourcing fees by employee count and compare Lite, Pro, and Premium packages."
      }
    };
    const meta = META[page] || META.pricing;
    const title = meta.title;
    const description = meta.description;
    document.title = title;
    const pagePath = home ? location.pathname.replace(/index\.html$/, "") : location.pathname;
    const englishUrl = `${location.origin}${pagePath}?lang=en`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = englishUrl;
    document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').forEach(meta => meta.content = description);
    document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(meta => meta.content = title);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = englishUrl;
    const locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.content = "en_US";
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
      try {
        const data = JSON.parse(script.textContent);
        if (data["@type"] === "ProfessionalService") {
          data.url = englishUrl;
          data.description = "Payroll outsourcing and complete HR services for organizations in Thailand.";
        } else if (data["@type"] === "WebApplication") {
          data.url = englishUrl;
          data.description = "Monthly payroll pricing calculator based on employee count.";
        } else if (data["@type"] === "FAQPage") {
          data.mainEntity = [
            {"@type":"Question","name":"How is payroll pricing calculated?","acceptedAnswer":{"@type":"Answer","text":"Pricing is based on employee count and the selected package. The first 30 employees use a flat monthly fee, with additional employees charged at the applicable volume tier."}},
            {"@type":"Question","name":"What information is needed for an initial assessment?","acceptedAnswer":{"@type":"Answer","text":"Prepare your employee count, payroll cycle, current systems, and required service scope so the team can recommend a suitable approach."}},
            {"@type":"Question","name":"Can we select only certain services?","acceptedAnswer":{"@type":"Answer","text":"Yes. You can start with Payroll, Recruitment, Visa and Work Permit, or another individual service, then add support as your needs evolve."}}
          ];
        }
        script.textContent = JSON.stringify(data);
      } catch (_) {}
    });
    const nav = document.querySelector("nav.menu");
    const toggle = document.querySelector(".menu-toggle");
    const switcher = document.querySelector(".lang-switch");
    if (nav) nav.setAttribute("aria-label", "Main navigation");
    if (toggle) toggle.setAttribute("aria-label", "Open menu");
    if (switcher) switcher.setAttribute("aria-label", "Language");
    document.querySelectorAll("[aria-label]").forEach(element => {
      const label = element.getAttribute("aria-label");
      if (label?.startsWith("ดูรายละเอียด ")) element.setAttribute("aria-label", label.replace("ดูรายละเอียด ", "View details: "));
    });
    document.querySelectorAll("img[alt]").forEach(image => {
      if (image.alt === "ทีมผู้เชี่ยวชาญวิเคราะห์และวางระบบทรัพยากรบุคคล") {
        image.alt = "HR specialists reviewing workforce systems and business processes";
      }
      if (image.alt === "คิวอาร์โค้ดสำหรับเพิ่มเพื่อนทาง LINE") {
        image.alt = "QR code to add Muang Srisuk Group on LINE";
      }
    });
  }

  // ไฟล์นี้ถูก inject แบบ dynamic ได้ ซึ่งอาจโหลดเสร็จหลัง DOMContentLoaded ยิงไปแล้ว
  // จึงต้องเช็ค readyState ก่อน ไม่งั้นตัวแปลจะไม่ทำงานเลย
  const onReady = fn => {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  };

  onReady(() => {
    document.querySelectorAll("[data-lang]").forEach(link => {
      const active = link.dataset.lang === currentLang;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
      link.addEventListener("click", () => {
        try { localStorage.setItem("oneStopHrLanguage", link.dataset.lang); } catch (_) {}
      });
    });

    let preferred = null;
    try { preferred = localStorage.getItem("oneStopHrLanguage"); } catch (_) {}
    if (!requestedLang && preferred && preferred !== currentLang) {
      location.replace(languageTarget(preferred) + location.hash);
      return;
    }

    if (requestedLang === "en" || requestedLang === "th") {
      try { localStorage.setItem("oneStopHrLanguage", requestedLang); } catch (_) {}
    }

    if (currentLang !== "en") return;
    translateTree(document.body);
    rewriteEnglishLinks();
    updateEnglishMetadata();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(translateTree));
    });
    observer.observe(document.body, {childList:true, subtree:true});
  });
})();
