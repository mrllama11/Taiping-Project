# PT China Taiping Insurance Indonesia

## About PT China Taiping Indonesia

# ENGLISH

PT. CHINA TAIPING INSURANCE INDONESIA (formerly known
as China Insurance Indonesia), is a local registered general
insurance company according to the law of Indonesia, dealing
with non-life insurance and reinsurance business.

# INDONESIAN

PT. CHINA TAIPING INSURANCE INDONESIA (dahulu dikenal
sebagai China Insurance Indonesia) adalah perusahaan asuransi
umum yang terdaftar berdasarkan hukum di Indonesia, bergerak
di bidang asuransi umum dan reasuransi.

# ENGLISH

PT. China Taiping Insurance Indonesia was
established 1996. Its head office is located in
Jakarta, and it has offices in downtown of Jakarta,
Bandung, Semarang, Surabaya and Medan.
At present, the insurance business transacted
by China Taiping Insurance Indonesia covers
enterprises and household property, marine hull,
marine cargo, construction and erection, motor
vehicles and general accident, etc.
China Taiping Insurance Indonesia strictly manages
in accordance with the law of insurance and the
concerned laws of Indonesia. To strengthen
technique and management, China Taiping
Insurance Indonesia is supported by the China
Taiping Insurance Holdings Company Limited and
the member companies of its group.
Since its operation, China Taiping Insurance
Indonesia has been maintaining sound financial
status and rapid business development.
At the same time, it has earned the support and
trust of the local and offshore insurance market.
Good cooperation has been established with fellow
companies and business associates in insurance
fields. More and more insured choose to insure
with PT. China Taiping Insurance Indonesia, as
it sound reputation has set up in the insurance
market.
At China Taiping Insurance, we promise sincere
service and diligent management. Honoring our
past, building on our future, we will uniquely
position ourselves in the world's financial and
insurance industries by building a strong brand
and a distinctive corporate profile.

# INDONESIAN

PT. China Taiping Insurance Indonesia didirikan
pada tahun 1996. Berkantor pusat di Jakarta,
memiliki kantor perwakilan di pusat kota Jakarta,
Bandung, Semarang, Surabaya dan Medan.
Saat ini, bisnis asuransi yang diakseptasi oleh China
Taiping Insurance Indonesia meliputi asuransi untuk
perusahaan, rumah tinggal, rangka kapal, pengangkutan,
konstruksi dan pemasangan, kendaraan bermotor dan
kecelakaan, dan lain sebagainya.
China Taiping Insurance Indonesia melakukan
pengelolaan yang ketat sesuai dengan hukum
perasuransian Indonesia dan hukum yang berlaku
di Indonesia. China Taiping Insurance Indonesia
didukung oleh China Taiping Insurance Holdings
Company Limited dan anak perusahaan group lainnya
dalam memperkuat bidang teknik dan manajemen.
Sejak perusahaan beroperasi, China Taiping
Insurance Indonesia telah mempertahankan kondisi
keuangan yang sehat dan perkembangan bisnis
yang pesat.
Pada saat yang bersamaan, perusahaan juga telah
mendapat dukungan dan kepercayaan dari pasar
asuransi lokal dan luar negeri. Kerjasama yang baik
telah dibangun dengan sesama perusahaan dan
rekan bisnis di bidang asuransi. Semakin banyak
Tertanggung yang memilih PT. China Taiping
Insurance Indonesia, sebagaimana reputasinya
yang sudah dikenal di pasar asuransi.
Di China Taiping Insurance, kami menjanjikan
pelayanan yang tulus dan pengelolaan yang tekun.
Kami menghargai masa lalu kami, dan membangun
masa depan kami, secara unik kami akan
menempatkan diri dengan membangun brand yang
kuat dan profil perusahaan yang khas di industri
asuransi dan dunia keuangan.

## Branding

Headline: Manage Your Risk , Enjoy Taiping Services

Brand color:#4cff43

### Summary

PT. China Taiping Insurance Indonesia, established in 1996, is a general insurance company headquartered in Jakarta with offices across major cities in Indonesia. It provides various insurance services, including property, marine, construction, motor vehicles, and general accidents. Supported by China Taiping Insurance Holdings, the company adheres to Indonesian insurance laws, maintains sound financial status, and has built a solid reputation for reliable service and management. China Taiping Insurance Indonesia is committed to strengthening its brand and continuing its growth in the local and global insurance markets.

### Websites features

Home :
News :
Our Products :
Claim :
Agency :
About Us :
Contact Us:
Login:

### Section with logos of featured publications [OJK etc.]

### Contact information

Head Office
Jakarta

The Tower 16th fl.

Jl. Jend. Gatot Subroto Kav. 12-13, Jakarta 12930

Tel : (62-21) 6080 0910 (hunting)

cntaiping@id.cntaiping.com
Social profiles: instagram, facebook, twitter

### Additional links [links not available yet]

### SECTIONS FOr understanding code logic

## SCript for giving dots

e.target.value: This is the current value of the input field, which contains what the user has typed in.

.replace(/\D/g, ''): This part of the code removes any non-digit characters from the input.

/\D/: This is a regular expression where \D matches any character that is not a digit. In regular expressions:
\d matches a digit (0-9).
\D (uppercase D) is the inverse, meaning "anything that is not a digit."
/g: The g flag stands for "global," meaning it will replace all instances of non-digit characters, not just the first occurrence.
'': This is what we replace non-digit characters with—in this case, we’re replacing them with nothing, effectively removing all non-digit characters like commas, dots, or spaces.

value.replace(): This line applies another regular expression to format the cleaned number with dots for every three digits.

/\B(?=(\d{3})+(?!\d))/g: This is a more complex regular expression, so let’s break it down:

\B: This matches a non-word boundary. This is key because we don’t want to add a dot at the start of the number (e.g., 1000 should become 1.000, not .1000).

(?=(\d{3})+(?!\d)): This is called a lookahead assertion, which checks for the pattern without consuming characters.

\d{3}: This checks for a group of three digits.
+: This allows the pattern to repeat for every group of three digits.
?!\d: This part ensures that after these groups of three digits, there is no digit. This prevents matching within longer numbers like 1000000 until the correct thousands position is reached.

## dots Flow

If the user types 1000000, the flow is:

- Remove non-digit characters → 1000000.
- Add dots at thousands positions → 1.000.000.
