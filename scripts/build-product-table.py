# Sinh src/data/san-pham-kho.json (bảng "Sản phẩm đang có" trên trang danh mục) từ danh sách kho.
# Nguồn: file CSV "sản phẩm có sẵn trong kho" (từ 10/2026) hoặc kho-cong-khai.json đã bỏ giá (cũ).
# File kho gốc nằm ngoài repo (du-lieu-noi-bo/), không đưa lên GitHub.
#   python3 scripts/build-product-table.py "../du-lieu-noi-bo/sản phẩm có sẵn trong kho-tháng 10.csv"
import csv, json, re, sys, collections

SRC = sys.argv[1]
OUT = 'src/data/san-pham-kho.json'

IMPORTED = {'ENEOS', 'Castrol', 'Shell', 'Caltex', 'Idemitsu', 'TotalEnergies', 'BP', 'Lukoil',
            'Cosmo Oil', 'Sinopec', 'Maxima Racing Oils'}
DOMESTIC = {'VHP', 'EMI', 'PVOIL Lube', 'Quốc Trung', 'Văn Đạo', 'Mipec', 'Mekong'}

def load(path):
    """Đọc danh sách kho thành [{'ten', 'hang', 'quy_cach'}].
    CSV tháng 10: cột Mã HH, Tên, Kiểu, Đặc tính, Hãng, Quy cách; 3 dòng đầu là tiêu đề."""
    if not path.lower().endswith('.csv'):
        return json.load(open(path))
    rows = list(csv.reader(open(path, encoding='utf-8-sig')))[3:]
    return [{'ma': r[0].strip(), 'ten': re.sub(r'\s+', ' ', r[1]).strip(), 'hang': r[4].strip(), 'quy_cach': r[5].strip()}
            for r in rows if len(r) >= 6 and r[1].strip()]


# (regex trên tên trong kho, tên dòng hiển thị, danh mục, slug trang sản phẩm hoặc None).
# Thứ tự quan trọng: luật đầu tiên khớp được dùng.
RULES = [
    (r'super hyrando se', 'ENEOS Super Hyrando SE 68', 'dau-thuy-luc', 'eneos-super-hyrando-68'),
    (r'super hyrando', 'ENEOS Super Hyrando', 'dau-thuy-luc', 'eneos-super-hyrando-68'),
    (r'mulpus', 'ENEOS Super Mulpus DX', 'dau-thuy-luc', 'eneos-super-mulpus-dx'),
    (r'hyspin aws|castrol aws', 'Castrol Hyspin AWS', 'dau-thuy-luc', 'castrol-hyspin-aws-68'),
    (r'hlpz', 'Castrol Hyspin HLP-Z 68', 'dau-thuy-luc', 'castrol-hyspin-hlpz-68'),
    (r'caltex hydraulic', 'Caltex Hydraulic Oil AW', 'dau-thuy-luc', 'caltex-hydraulic-aw-68'),
    (r'cosmo', 'Cosmo Hydro AW', 'dau-thuy-luc', 'cosmo-hydro-aw-68'),
    (r'spinax', 'VHP Spinax AW', 'dau-thuy-luc', 'vhp-spinax-aw'),
    (r'isonas', 'VHP Isonas AW', 'dau-thuy-luc', 'vhp-isonas-aw'),
    (r'rosia aw46', 'VHP Rosia AW 46', 'dau-thuy-luc', None),
    (r'rosia cs', 'VHP Rosia CS 46', 'dau-ranh-truot', 'vhp-rosia-cs'),
    (r'emi (aw|hydra)|emi 100|thuỷ lực emi', 'EMI AW 68', 'dau-thuy-luc', 'emi-aw-68'),
    (r'xone', 'X-One AW 68', 'dau-thuy-luc', 'x-one-aw-68'),
    (r'law68', 'EMER LAW 68', 'dau-thuy-luc', 'emer-law-68'),
    (r'maxima 68', 'Maxima 68', 'dau-thuy-luc', 'maxima-68'),
    (r'apex tl', 'APEX TL 68', 'dau-thuy-luc', 'apex-tl-68'),
    (r'niwa nano industry', 'Niwa Nano Industry AW 32', 'dau-thuy-luc', None),
    (r'shl v5', 'SHL V5', 'dau-thuy-luc', None),
    (r'deo ci', 'ENEOS DEO CI-4', 'dau-dong-co-diesel', 'eneos-deo-ci-4'),
    (r'deo cf', 'ENEOS DEO CF-4', 'dau-dong-co-diesel', 'eneos-deo-cf-4'),
    (r'deo cd', 'ENEOS DEO CD', 'dau-dong-co-diesel', 'eneos-deo-cd'),
    (r'turbomax|castrol ci4', 'Castrol CRB Turbomax CI-4', 'dau-dong-co-diesel', 'castrol-crb-turbomax'),
    (r'vecton', 'Castrol Vecton 15W-40', 'dau-dong-co-diesel', 'castrol-vecton'),
    (r'crb', 'Castrol CRB CF-4', 'dau-dong-co-diesel', 'castrol-crb-cf-4'),
    (r'shell r4', 'Shell Rimula R4 X 15W-40', 'dau-dong-co-diesel', 'shell-rimula-r4-x'),
    (r'shell r5', 'Shell Rimula R5', 'dau-dong-co-diesel', None),
    (r'total ci', 'TotalEnergies Rubia TIR 7400 15W-40', 'dau-dong-co-diesel', 'total-rubia-tir-7400'),
    (r'total cf', 'TotalEnergies Rubia XT 20W-50', 'dau-dong-co-diesel', 'total-rubia-xt'),
    (r'total', 'TotalEnergies 15W-40 (API SN/CF, CH)', 'dau-dong-co-diesel', None),
    (r'vanellus', 'BP Vanellus Turbo', 'dau-dong-co-diesel', None),
    (r'lukoil', 'Lukoil dầu động cơ', 'dau-dong-co-diesel', None),
    (r'caltex cf', 'Caltex Delo Silver Multigrade 20W-50', 'dau-dong-co-diesel', 'caltex-delo-silver-multigrade'),
    (r'emi cf', 'EMI CF-4 20W-50', 'dau-dong-co-diesel', 'emi-cf-4-20w-50'),
    (r'emi ci', 'EMI CI-4 20W-50', 'dau-dong-co-diesel', 'emi-ci-4-20w-50'),
    (r'hdd power|power turbo|máy dầu api ci-4 sae 15w40 emi|cj-4', 'EMI dầu động cơ diesel', 'dau-dong-co-diesel', None),
    (r'maxima c[fi]4', 'Maxima dầu động cơ diesel', 'dau-dong-co-diesel', None),
    (r'diamond turbo', 'VHP Diamond Turbo', 'dau-dong-co-diesel', 'vhp-diamond-turbo'),
    (r'apex hd50', 'APEX HD50', 'dau-dong-co-diesel', None),
    (r'eneos gear', 'ENEOS Gear Oil GL-5', 'dau-cau-hop-so', 'eneos-gear-gl-5'),
    (r'castrol 85w140', 'Castrol Transmax Axle 85W-140', 'dau-cau-hop-so', 'castrol-transmax-axle-85w-140'),
    (r'spirax', 'Shell Spirax S2 A 85W-140', 'dau-cau-hop-so', 'shell-spirax-s2-a'),
    (r'emi (85w140|80w90|gear)', 'EMI Gear EP GL-5', 'dau-cau-hop-so', 'emi-gear-ep-gl-5'),
    (r'pv oil', 'PVOIL PV Transmission EP GL-4', 'dau-cau-hop-so', 'pv-transmission-ep-gl4'),
    (r'p140', 'VHP dầu cầu P140', 'dau-cau-hop-so', 'vhp-p140'),
    (r'spider', 'VHP Spider', 'dau-cau-hop-so', None),
    (r'spadila atf', 'VHP Spadila ATF', 'dau-cau-hop-so', 'vhp-spadila-atf'),
    (r'spadila', 'VHP Spadila GL-5', 'dau-cau-hop-so', 'vhp-spadila-gl5'),
    (r'hymatran', 'VHP Hymatran Oil 10W', 'dau-cau-hop-so', 'vhp-hymatran-10w'),
    (r'niwa nano', 'Niwa Nano dầu cầu GL-4', 'dau-cau-hop-so', None),
    (r'mipec 140', 'Mipec dầu cầu', 'dau-cau-hop-so', None),
    (r'bonnoc ts', 'ENEOS Bonnoc TS', 'dau-banh-rang', 'eneos-bonnoc-ts'),
    (r'bonnoc m', 'ENEOS Bonnoc M150', 'dau-banh-rang', None),
    (r'rosia ep', 'VHP Rosia EP', 'dau-banh-rang', 'vhp-rosia-ep'),
    (r'topax', 'VHP Topax Oil', 'dau-banh-rang', None),
    (r'faircol', 'ENEOS Faircol RA 32', 'dau-may-nen-khi', 'eneos-faircol-ra'),
    (r'daphne', 'Idemitsu Daphne Super Screw', 'dau-may-nen-khi', 'idemitsu-daphne-super-screw'),
    (r'rosia cpr', 'VHP Rosia CPR', 'dau-may-nen-khi', 'vhp-rosia-cpr'),
    (r'heatrans', 'VHP Heatrans Oil', 'dau-truyen-nhiet', 'vhp-heatrans'),
    (r'sny', 'SHL Syn Therm 32L', 'dau-truyen-nhiet', 'shl-syn-therm'),
    (r'synthway', 'SHL Synthway 68M', 'dau-ranh-truot', 'shl-synthway-68m'),
    (r'rosia sl ?w', 'VHP Rosia SLW', 'dau-ranh-truot', None),
    (r'edm', 'SHL EDM 32', 'dau-xung-dien-edm', 'shl-edm-32'),
    (r'unitrans', 'VHP Unitrans Oil (Hi-Volt)', 'dau-cach-dien', 'vhp-unitrans-oil'),
    (r'vcu', 'VHP Rosia VCU 100', 'dau-may-hut-chan-khong', None),
    (r'spin oil', 'VHP Spin Oil 10', 'dau-may-may', None),
    (r'rosia oil 10', 'VHP Rosia Oil 10', 'dau-may-may', None),
    (r'antirus', 'VHP Antirus Oil', 'dau-chong-gi-set', None),
    (r'lotus', 'VHP Lotus Oil LS', 'dau-cat-got', 'vhp-lotus-oil-ls'),
    (r'crania', 'VHP Crania Oil', 'dau-cat-got', None),
    (r'rosecut', 'VHP Rosecut SYNT 120', 'dau-cat-got', None),
    (r'maxima cắt', 'Maxima dầu cắt gọt', 'dau-cat-got', None),
    (r'eneos mc', 'ENEOS MC SJ 20W-40 (MA, MB)', 'dau-nhot-xe-may', 'eneos-mc-sj-20w-40'),
    (r'maxxi|coolant', 'Maxxi Coolant Red', 'nuoc-lam-mat', 'maxxi-coolant-red'),
    (r'gadus s2', 'Shell Gadus S2 V220 2', 'mo-boi-tron-cong-nghiep', 'shell-gadus-s2-v220-2'),
    (r'gadus s3', 'Shell Gadus S3 V220C 2', 'mo-chiu-nhiet', 'shell-gadus-s3-v220c-2'),
    (r'licas', 'VHP Licas Grease', 'mo-boi-tron-cong-nghiep', 'licas-grease'),
    (r'lithium grease ls', 'VHP Lithium Grease LS 00', 'mo-boi-tron-cong-nghiep', None),
    (r'lithium grease', 'VHP Lithium Grease', 'mo-boi-tron-cong-nghiep', 'vhp-lithium-grease'),
    (r'caxilium', 'VHP Caxilium Grease', 'mo-boi-tron-cong-nghiep', 'vhp-caxilium-grease'),
    (r'opal', 'VHP Opal Grease', 'mo-boi-tron-cong-nghiep', 'vhp-opal-grease'),
    (r'epnoc', 'ENEOS Epnoc Grease AP', 'mo-boi-tron-cong-nghiep', 'eneos-epnoc-ap'),
    (r'sinopec', 'Sinopec mỡ lithium', 'mo-boi-tron-cong-nghiep', None),
    (r'pv grease', 'PVOIL PV Grease', 'mo-boi-tron-cong-nghiep', 'pvoil-pv-grease'),
    (r'ceno', 'Calix Ceno Grease No3', 'mo-boi-tron-cong-nghiep', 'calix-ceno-grease'),
    (r'calix|calux', 'Calix mỡ L3, L4', 'mo-boi-tron-cong-nghiep', None),
    (r'emar', 'EMER mỡ bôi trơn', 'mo-boi-tron-cong-nghiep', None),
    (r'maxima l', 'Maxima mỡ bôi trơn', 'mo-boi-tron-cong-nghiep', None),
    (r'mê kong|mekong', 'Mekong mỡ L3', 'mo-boi-tron-cong-nghiep', None),
    (r'mipec 1-13', 'Mipec mỡ 1-13', 'mo-boi-tron-cong-nghiep', None),
    (r'phoenix|văn đạo', 'Văn Đạo Phoenix MP3', 'mo-boi-tron-cong-nghiep', None),
]

# Cấp hiển thị cho từng dòng (ghi tay, không tự trích từ tên trong kho). Cập nhật theo kho tháng 10/2026.
GRADES = {
    'ENEOS Super Hyrando': 'ISO VG 68', 'ENEOS Super Hyrando SE 68': 'ISO VG 68', 'ENEOS Super Mulpus DX': 'ISO VG 46, 68',
    'Castrol Hyspin AWS': 'ISO VG 68', 'Caltex Hydraulic Oil AW': 'ISO VG 68', 'Cosmo Hydro AW': 'ISO VG 68',
    'VHP Spinax AW': 'ISO VG 68, 100', 'VHP Isonas AW': 'ISO VG 32, 68, 100', 'VHP Rosia AW 46': 'ISO VG 46',
    'VHP Rosia CS 46': 'ISO VG 46', 'EMI AW 68': 'ISO VG 68', 'X-One AW 68': 'ISO VG 68',
    'EMER LAW 68': 'ISO VG 68', 'Maxima 68': 'ISO VG 68', 'APEX TL 68': 'ISO VG 68',
    'Niwa Nano Industry AW 32': 'ISO VG 32', 'SHL V5': '',
    'ENEOS DEO CI-4': 'API CI-4 · 15W-40, 20W-50', 'ENEOS DEO CF-4': 'API CF-4 · 15W-40, 20W-50',
    'ENEOS DEO CD': 'API CD · 15W-40, 20W-50', 'Castrol CRB Turbomax CI-4': 'API CI-4 · 20W-50',
    'Castrol Vecton 15W-40': 'API CI-4 · 15W-40', 'Castrol CRB CF-4': '15W-40, 20W-50', 'Shell Rimula R4 X 15W-40': 'API CI-4 · 15W-40',
    'Shell Rimula R5': '10W-40', 'TotalEnergies Rubia TIR 7400 15W-40': 'API CI-4 · 15W-40', 'TotalEnergies Rubia XT 20W-50': 'API CF-4 · 20W-50', 'TotalEnergies 15W-40 (API SN/CF, CH)': '15W-40',
    'BP Vanellus Turbo': '15W-40', 'Lukoil dầu động cơ': 'API CF · 15W-40', 'Caltex Delo Silver Multigrade 20W-50': 'API CF · 20W-50',
    'EMI dầu động cơ diesel': 'API CF-4, CI-4 · 20W-50', 'Maxima dầu động cơ diesel': 'API CF-4, CI-4 · 20W-50',
    'VHP Diamond Turbo': '20W-50', 'APEX HD50': 'SAE 50',
    'ENEOS Gear Oil GL-5': 'API GL-5 · 90', 'Castrol Transmax Axle 85W-140': 'API GL-5 · 85W-140', 'Shell Spirax S2 A 85W-140': 'API GL-5 · 85W-140',
    'EMI Gear EP GL-5': 'API GL-5 · 80W-90, 85W-140', 'EMI CF-4 20W-50': 'API CF-4 · 20W-50', 'EMI CI-4 20W-50': 'API CI-4 · 20W-50',
    'ENEOS MC SJ 20W-40 (MA, MB)': 'API SJ · 20W-40', 'Maxxi Coolant Red': '', 'PVOIL PV Transmission EP GL-4': 'API GL-4 · SAE 90',
    'VHP Spider': '80W-90, 85W-140, 90, 140', 'VHP Spadila GL-5': 'API GL-5 · 80W-90, 85W-140',
    'VHP Spadila ATF': 'ATF Dexron II, III', 'VHP dầu cầu P140': 'SAE 140', 'VHP Hymatran Oil 10W': 'SAE 10W', 'Niwa Nano dầu cầu GL-4': 'API GL-4 · 80W-90, 85W-140',
    'Mipec dầu cầu': 'SAE 90, 140', 'ENEOS Bonnoc TS': 'ISO VG 220', 'ENEOS Bonnoc M150': 'ISO VG 150',
    'VHP Rosia EP': 'ISO VG 100, 150, 220, 320', 'VHP Topax Oil': 'ISO VG 150, 220, 320, 460',
    'ENEOS Faircol RA 32': 'ISO VG 32', 'Idemitsu Daphne Super Screw': 'ISO VG 32, 46', 'VHP Rosia CPR': 'ISO VG 32, 46',
    'VHP Heatrans Oil': 'ISO VG 32, 46', 'SHL Syn Therm 32L': 'ISO VG 32', 'Castrol Hyspin HLP-Z 68': 'ISO VG 68',
    'SHL Synthway 68M': 'ISO VG 68', 'VHP Rosia SLW': 'ISO VG 68, 150', 'SHL EDM 32': '', 'VHP Rosia VCU 100': 'ISO VG 100',
    'VHP Spin Oil 10': 'ISO VG 10', 'VHP Rosia Oil 10': 'ISO VG 10', 'VHP Antirus Oil': '136, 398',
    'VHP Unitrans Oil (Hi-Volt)': '', 'VHP Lotus Oil LS': '', 'VHP Crania Oil': '', 'VHP Rosecut SYNT 120': '',
    'Maxima dầu cắt gọt': '', 'Shell Gadus S2 V220 2': 'NLGI 2', 'Shell Gadus S3 V220C 2': 'NLGI 2',
    'VHP Licas Grease': 'NLGI 3', 'VHP Lithium Grease': 'NLGI 4', 'VHP Lithium Grease LS 00': 'NLGI 00', 'VHP Caxilium Grease': 'NLGI 2, 3',
    'VHP Opal Grease': 'NLGI 3, 4', 'ENEOS Epnoc Grease AP': 'NLGI 00', 'Sinopec mỡ lithium': 'NLGI 2, 3',
    'PVOIL PV Grease': 'NLGI 2, 3', 'Calix Ceno Grease No3': 'NLGI 3', 'Calix mỡ L3, L4': 'NLGI 3, 4', 'EMER mỡ bôi trơn': 'NLGI 3, 4',
    'Maxima mỡ bôi trơn': 'NLGI 3, 4', 'Mekong mỡ L3': 'NLGI 3', 'Mipec mỡ 1-13': '', 'Văn Đạo Phoenix MP3': 'NLGI 00, 0, 3',
}

SIZE = re.compile(r'(\d+)\s*(l|lít|kg)\b', re.I)

def norm_pack(pack, name):
    """Chuẩn hóa quy cách: 'Phuy 209 L', 'Xô 18 kg'... Lấy dung tích trong tên khi cột quy cách thiếu."""
    p = re.sub(r'\s+', ' ', pack).strip()
    if not SIZE.search(p):
        m = SIZE.search(name)
        if m: p = f'{p} {m.group(0)}'
    p = re.sub(r'(\d+)\s*(l|lít)\b', r'\1 L', p, flags=re.I)
    p = re.sub(r'(\d+)\s*kg\b', r'\1 kg', p, flags=re.I)
    p = re.sub(r'^thùng', 'Thùng', p, flags=re.I)
    if re.fullmatch(r'\d+ L', p):
        p = ('Phuy ' if int(p.split()[0]) > 100 else 'Can ') + p
    if p.lower() == 'ống':
        p = 'Ống (hộp 12 ống)' if '12 ống' in name else 'Ống 400 g (thùng 30 ống)'
    return p[:1].upper() + p[1:]

# Hàng nhỏ cho xe con / tiêu dùng, hàng không rõ mã: không đưa lên bảng.
SKIP = re.compile(r'giá rẻ|rosla|^mỡ vhp$|rosia 460|shell hx3|eneos gear gl 80w', re.I)
# Hàng không có danh mục trên web (để trống: dầu xe máy, nước làm mát đã có danh mục từ 05/10/2026).
SKIP_NO_HUB = re.compile(r'(?!)')

# Tên hãng trong file kho -> tên hiển thị thống nhất.
BRAND = {'shl lubricants': 'SHL Lubricants', 'maxima racing oils': 'Maxima Racing Oils', 'pvoil lube': 'PVOIL Lube'}

items = load(SRC)
skipped = []
lines = collections.OrderedDict()
unmatched = []
for it in items:
    name = it['ten']
    if SKIP.search(name.strip()):
        continue
    if SKIP_NO_HUB.search(name):
        skipped.append(name)
        continue
    it['hang'] = BRAND.get(it['hang'].strip().lower(), it['hang'].strip())
    rule = next(((label, cat, page) for pat, label, cat, page in RULES if re.search(pat, name, re.I)), None)
    if not rule:
        unmatched.append(name)
        continue
    label, cat, page = rule
    ln = lines.setdefault((cat, label), {'ten': label, 'hang': it['hang'], 'danh_muc': cat, 'cap': GRADES.get(label, ''), 'quy_cach': [], **({'trang': page} if page else {})})
    pack = norm_pack(it['quy_cach'], name)
    if pack not in ln['quy_cach']:
        ln['quy_cach'].append(pack)

# Quy cách có trong kho nhưng dòng kho thiếu tên hãng nên bị lọc ở bước trước.
EXTRA_PACKS = {'VHP Licas Grease': ['Ống 400 g (thùng 30 ống)']}
for ln in lines.values():
    ln['quy_cach'] += [p for p in EXTRA_PACKS.get(ln['ten'], []) if p not in ln['quy_cach']]

out = []
for ln in lines.values():
    # Bỏ quy cách chỉ ghi "Xô"/"Phuy" (kho thiếu dung tích) khi đã có dòng cùng loại ghi rõ dung tích.
    ln['quy_cach'] = [p for p in ln['quy_cach'] if ' ' in p or not any(q.startswith(p + ' ') for q in ln['quy_cach'])]
    h = ln['hang']
    ln['nguon'] = 'nhap-khau' if h in IMPORTED else 'trong-nuoc' if h in DOMESTIC else 'khac'
    out.append(ln)
json.dump(out, open(OUT, 'w'), ensure_ascii=False, indent=1)
print(f'{len(out)} dòng sản phẩm -> {OUT}')
if skipped:
    print('Không có danh mục trên web (bỏ qua):', *skipped, sep='\n  ')
if unmatched:
    print('Không khớp luật nào (bỏ qua):', *unmatched, sep='\n  ')
