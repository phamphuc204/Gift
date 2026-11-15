
import { PRODUCTS } from '../infrastructure/mockData';
import { Product } from '../domain/types';

export interface RecommendationParams {
  budgetDisplay: string;
  recipient: string;
  delicacies: string;
  packaging: string;
}

export interface RecommendedProduct {
  product: Product;
  score: number;
  reason: string;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}



interface BudgetRange {
  min: number;
  max: number;
}

function parseBudgetNumber(value: string): number {
  // Ví dụ: 2.5 hoặc 1.000.000
  if (/^\d{1,3}([.,]\d{3})+$/.test(value)) {
    return Number(value.replace(/[.,]/g, ''));
  }

  return Number(value.replace(',', '.'));
}

function getBudgetRange(value: string): BudgetRange | null {
  const text = normalize(value);

  const numbers = text.match(/\d+(?:[.,]\d+)*/g);

  if (!numbers?.length) return null;

  const hasMillionUnit = text.includes('trieu');
  const multiplier = hasMillionUnit ? 1_000_000 : 1;

  const amounts = numbers.map((number) => {
    return parseBudgetNumber(number) * multiplier;
  });

  if (amounts.some((amount) => !Number.isFinite(amount))) {
    return null;
  }

  // Ngân sách dưới 1 triệu
  if (text.includes('duoi') || text.includes('<')) {
    return {
      min: 0,
      max: amounts[0],
    };
  }

  // Ngân sách trên 5 triệu
  if (text.includes('tren') || text.includes('>')) {
    return {
      min: amounts[0],
      max: Infinity,
    };
  }

  // Ngân sách theo khoảng, ví dụ 1-2.5 triệu
  if (amounts.length >= 2) {
    return {
      min: Math.min(amounts[0], amounts[1]),
      max: Math.max(amounts[0], amounts[1]),
    };
  }

  // Chỉ có một mức ngân sách cụ thể
  return {
    min: 0,
    max: amounts[0],
  };
}


export function recommendProducts(
  params: RecommendationParams
): RecommendedProduct[] {
  const budgetRange = getBudgetRange(params.budgetDisplay);
  const recipient = normalize(params.recipient);
  const delicacies = normalize(params.delicacies);
  const packaging = normalize(params.packaging);

        const scored = PRODUCTS.filter((product) => {
        const isAvailable = product.inStock && product.stockCount > 0;

        const isWithinBudget =
            budgetRange === null ||
            (
            product.price >= budgetRange.min &&
            product.price <= budgetRange.max
            );

        return isAvailable && isWithinBudget;
        }).map(product => {
      let score = 0;
      const reasons: string[] = [];

      const productText = normalize([
        product.name,
        product.subtitle,
        product.categoryLabel,
        product.description,
        ...(product.delicacies ?? []).map((item) =>
          `${item.name} ${item.description}`
        ),
      ].join(' '));

        // 1. Ngân sách
        if (budgetRange !== null) {
        score += 40;
        reasons.push('Phù hợp khoảng ngân sách');
        }

      // 2. Sản vật mong muốn
      if (delicacies && !delicacies.includes('chua xac dinh')) {
        const keywords = delicacies
          .split(/[,; và]+/)
          .filter((word) => word.length >= 3);

        const matched = keywords.filter((word) =>
          productText.includes(word)
        );

        if (matched.length > 0) {
          score += matched.length * 15;
          reasons.push('Có sản vật khách hàng mong muốn');
        }
      }

      // 3. Phong cách bao bì
      if (packaging && !packaging.includes('chua xac dinh')) {
        const packagingKeywords = packaging
          .split(/[,; và]+/)
          .filter((word) => word.length >= 3);

        if (packagingKeywords.some((word) => productText.includes(word))) {
          score += 20;
          reasons.push('Phù hợp phong cách bao bì');
        }
      }

      // 4. Đối tượng nhận quà
      if (recipient && !recipient.includes('chua xac dinh')) {
        const recipientKeywords = recipient
          .split(/[,; và]+/)
          .filter((word) => word.length >= 3);

        if (recipientKeywords.some((word) => productText.includes(word))) {
          score += 10;
          reasons.push('Phù hợp đối tượng nhận quà');
        }
      }

      // 5. Đánh giá và tình trạng nổi bật
      score += product.rating * 2;

      if (product.isFeatured) score += 5;

      return {
        product,
        score,
        reason: reasons.length
          ? reasons.join(', ')
          : 'Được chọn dựa trên mức giá và chất lượng sản phẩm',
      };
    });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
